/* eslint-disable @typescript-eslint/no-extra-parens */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { StudentService } from '../student/student.service';
import { TrafficErrorService } from '../traffic-error/traffic-error.service';
import { CreateTransportDto } from '../transport/dto/create-transport.dto';
import { TransportService } from '../transport/transport.service';
import { UserEntity } from '../user/repository/user.entity';
import { UserService } from '../user/user.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportQueryParamDto } from './dto/report-query-param.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportQueryFilter } from './query-filter/report.query-filter';
import { ReportStatusEntity } from './repository/report-status.entity';
import { ReportEntity } from './repository/report.entity';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(ReportEntity)
        private readonly reportRepository: Repository<ReportEntity>,
        @InjectRepository(ReportStatusEntity)
        private readonly reportStatusRepository: Repository<ReportStatusEntity>,
        private readonly trafficErrorService: TrafficErrorService,
        private readonly transportService: TransportService,
        private readonly studentService: StudentService,
        private readonly userService: UserService,
    ) {}

    async findAll(dto: ReportQueryParamDto): Promise<ReportEntity[]> {
        if (dto.status) {
            const status = await this.reportStatusRepository.findOne({
                code: dto.status,
            });

            dto = {
                ...dto,
                statusId: status?.id,
            } as ReportQueryParamDto;
        }
        if (dto.transportPlateNo) {
            const transport = await this.transportService.findOneByPlateNo(
                dto.transportPlateNo,
            );

            dto = {
                ...dto,
                transportId: transport?.id,
            } as ReportQueryParamDto;
        }
        if (dto.studentCode) {
            const student = await this.studentService.findOneByStudentCode(
                dto.studentCode,
            );

            dto = {
                ...dto,
                studentId: student?.id,
            } as ReportQueryParamDto;
        }
        if (dto.userCode) {
            const user = await this.userService.findOneByCode(dto.userCode);

            dto = {
                ...dto,
                userId: user?.id,
            } as ReportQueryParamDto;
        }

        const query = new ReportQueryFilter(dto).toTypeormQuery();
        query.relations = ['reportTrafficErrors'];

        return this.reportRepository.find(query);
    }

    async findOne(reportId: number): Promise<ReportEntity> {
        return this.reportRepository.findOne(reportId, {
            relations: ['reportTrafficErrors'],
        });
    }

    async findStatus(status: string): Promise<ReportStatusEntity> {
        return this.reportStatusRepository.findOne({ code: status });
    }

    async findAllStatus(): Promise<ReportStatusEntity[]> {
        return this.reportStatusRepository.find();
    }

    async create(
        user: UserEntity,
        dto: CreateReportDto,
    ): Promise<ReportEntity> {
        // validate & create student
        let student = await this.studentService.findOneByStudentCode(
            dto?.studentCode,
        );
        student =
            !student && dto?.studentCode && dto?.studentName
                ? await this.studentService.create({
                      code: dto?.studentCode,
                      name: dto?.studentName,
                  } as CreateStudentDto)
                : student;

        // validate & create transport
        let transport = await this.transportService.findOneByPlateNo(
            dto?.transportPlateNo,
        );
        transport = !transport
            ? await this.transportService.create({
                  plateNo: dto?.transportPlateNo,
                  code: dto?.transportCode,
                  status: dto?.transportStatus,
              } as CreateTransportDto)
            : transport;

        // create new report
        const status = await this.reportStatusRepository.findOne({
            code: dto?.status,
        });
        const report = await this.reportRepository.save({
            status,
            location: dto?.location,
            user,
            transport,
            student,
        } as ReportEntity);

        // create new report history
        if (report) {
            // create traffic error
            await this.trafficErrorService.createAll(
                report.id,
                dto.trafficErrors,
            );
        }

        return this.reportRepository.findOne(report?.id);
    }

    async update(
        reportId: number,
        dto: UpdateReportDto,
    ): Promise<ReportEntity> {
        const status = await this.reportStatusRepository.findOne({
            code: dto.status,
        });

        // update report
        const updatedReport = await this.reportRepository.save({
            id: reportId,
            status,
            transportId: dto.transportId,
            userId: dto.userId,
            studentId: dto.studentId,
            location: dto.location,
        } as ReportEntity);

        // update traffic errors
        if (dto.trafficErrors && dto.trafficErrors.length > 0) {
            await this.trafficErrorService.updateAll(
                updatedReport.id,
                dto.trafficErrors,
            );
        }

        return updatedReport;
    }
}
