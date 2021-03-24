import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrafficErrorService } from '../traffic-error/traffic-error.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportHistoryEntity } from './repository/report-history.entity';
import { ReportStatusEntity } from './repository/report-status.entity';
import { ReportEntity } from './repository/report.entity';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(ReportEntity)
        private readonly reportRepository: Repository<ReportEntity>,
        @InjectRepository(ReportHistoryEntity)
        private readonly reportHistoryRepository: Repository<
            ReportHistoryEntity
        >,
        @InjectRepository(ReportStatusEntity)
        private readonly reportStatusRepository: Repository<ReportStatusEntity>,
        private readonly trafficErrorService: TrafficErrorService,
    ) {}

    async findOne(reportId: number): Promise<ReportEntity> {
        return this.reportRepository.findOne(reportId, {
            relations: ['histories', 'reportTrafficErrors'],
        });
    }

    async findStatus(status: string): Promise<ReportStatusEntity> {
        return this.reportStatusRepository.findOne({ name: status });
    }

    async create(dto: CreateReportDto): Promise<ReportEntity> {
        const status = await this.reportStatusRepository.findOne({
            name: dto.status,
        });

        // create new report
        const report = await this.reportRepository.save({
            status,
            transportId: dto.transportId,
            userId: dto.userId,
            studentId: dto.studentId,
            location: dto.location,
        } as ReportEntity);

        // create new report history
        if (report) {
            // add report history
            await this.reportHistoryRepository.save({
                reportId: report.id,
                statusId: report.statusId,
                userId: report.userId,
                transportId: report.transportId,
                location: report.location,
                remark: dto.remark,
            } as ReportHistoryEntity);

            // create traffic error
            await this.trafficErrorService.createAll(
                report.id,
                dto.trafficErrorList,
            );
        }

        return report;
    }

    async update(
        reportId: number,
        dto: UpdateReportDto,
    ): Promise<ReportEntity> {
        const status = await this.reportStatusRepository.findOne({
            name: dto.status,
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
        await this.trafficErrorService.updateAll(
            updatedReport.id,
            dto.trafficErrors,
        );

        // create new history with remark
        await this.reportHistoryRepository.save(
            {
                reportId: updatedReport.id,
                status,
                userId: updatedReport.userId,
                transportId: updatedReport.transportId,
                location: updatedReport.location,
                remark: dto.remark,
            } as ReportHistoryEntity,
            { reload: true },
        );

        return updatedReport;
    }
}
