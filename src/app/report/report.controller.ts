import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { StudentService } from '../student/student.service';
import { TransportService } from '../transport/transport.service';
import { SubmitReportDto } from './dto/submit-report.dto';
import { ReportDto } from './dto/report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportService } from './report.service';
import { CreateTransportDto } from '../transport/dto/create-transport.dto';
import { TransportStatus } from '../transport/enum/transport-status.enum';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportStatus } from './enum/report-status.enum';
import { UserService } from '../user/user.service';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { TrafficErrorService } from '../traffic-error/traffic-error.service';

@Controller()
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        private readonly studentService: StudentService,
        private readonly transportService: TransportService,
        private readonly userService: UserService,
        private readonly trafficErrorService: TrafficErrorService,
    ) {}

    @Post()
    async create(@Body() body: SubmitReportDto): Promise<ReportDto> {
        // validate user
        const user = await this.userService.findOne(body.userId);
        if (!user) {
            throw new ResourceNotFoundException('User ID was not found.');
        }

        // validate & create student
        let student = null;
        if (body.studentCode) {
            student = await this.studentService.findOneByStudentCode(
                body.studentCode,
            );

            if (!student) {
                student = await this.studentService.create({
                    course: body.studentCourse,
                    college: body.studentCollege,
                    studentCode: body.studentCode,
                    fullname: body.studentFullname,
                } as CreateStudentDto);
            }
        }

        // validate & create transport
        let transport = await this.transportService.findOneByPlateNo(
            body.transportPlateNo,
        );
        if (!transport) {
            transport = await this.transportService.create({
                studentId: student?.id ?? null,
                plateNo: body.transportPlateNo,
                passCode: body.transportPassCode,
                type: body.transportType,
                status: TransportStatus.Na,
            } as CreateTransportDto);
        }

        // create report
        const newReport = await this.reportService.create({
            transportId: transport.id,
            studentId: student.id,
            location: body.location,
            remark: body.remark,
            status: ReportStatus.New,
            userId: user.id,
            trafficErrorList: body.trafficErrors,
        } as CreateReportDto);

        return ReportDto.fromModel(
            await this.reportService.findOne(newReport.id),
        );
    }

    @Put(':reportId')
    async update(
        @Param('reportId', ParseIntPipe) reportId: number,
        @Body() body: UpdateReportDto,
    ): Promise<ReportDto> {
        // validate report
        const report = await this.reportService.findOne(reportId);
        if (!report) {
            throw new ResourceNotFoundException('Report ID was not found.');
        }

        // validate status
        const status = await this.reportService.findStatus(body.status);
        if (!status) {
            throw new ResourceNotFoundException('Status was not found.');
        }

        // validate user
        const user = await this.userService.findOne(body.userId);
        if (body.userId && !user) {
            throw new ResourceNotFoundException('User ID not found.');
        }

        // validate or create student
        const student = await this.studentService.findOne(body.studentId);
        if (body.studentId && !student) {
            throw new ResourceNotFoundException('Student ID was not found.');
        }

        // validate or create transport
        const transport = await this.transportService.findOne(body.transportId);
        if (body.transportId && !transport) {
            throw new ResourceNotFoundException('Transport ID was not found.');
        }

        // update report
        await this.reportService.update(report.id, {
            userId: user?.id ?? report.userId,
            status: status?.name ?? report.status.name,
            studentId: student?.id ?? report.studentId,
            transportId: transport?.id ?? report.transportId,
            location: body.location ?? report.location,
            remark: body.remark,
            trafficErrors: body.trafficErrors,
        } as UpdateReportDto);

        return ReportDto.fromModel(await this.reportService.findOne(reportId));
    }
}
