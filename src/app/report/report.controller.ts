import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { StudentService } from '../student/student.service';
import { TransportService } from '../transport/transport.service';
import { SubmitReportDto } from './dto/submit-report.dto';
import { ReportSummaryDto } from './dto/report-summary.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportService } from './report.service';
import { CreateTransportDto } from '../transport/dto/create-transport.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { UserService } from '../user/user.service';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { ReportQueryParamDto } from './dto/report-query-param.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ReportDto } from './dto/report.dto';

@ApiTags('Report')
@UseGuards(AuthGuard)
@Controller()
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        private readonly studentService: StudentService,
        private readonly transportService: TransportService,
        private readonly userService: UserService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get multiple report.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: [ReportSummaryDto],
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async find(
        @Query() param: ReportQueryParamDto,
    ): Promise<ReportSummaryDto[]> {
        const reportList = await this.reportService.findAll(param);

        return reportList.map(ReportSummaryDto.fromModel);
    }

    @Get(':reportId')
    @ApiOperation({ summary: 'Get single report.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: ReportDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async findOne(
        @Param('reportId', ParseIntPipe) reportId: number,
    ): Promise<ReportDto> {
        const report = await this.reportService.findOne(reportId);

        if (!report) {
            throw new ResourceNotFoundException('Report ID not found.');
        }

        return ReportDto.fromModel(report);
    }

    @Post()
    @ApiOperation({ summary: 'Create report.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: ReportDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
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
                status: body?.transportStatus,
            } as CreateTransportDto);
        }

        // create report
        const newReport = await this.reportService.create({
            transportId: transport?.id,
            studentId: student?.id,
            location: body?.location,
            remark: body?.remark,
            status: body?.status,
            userId: user?.id,
            trafficErrorList: body?.trafficErrors,
        } as CreateReportDto);

        return ReportDto.fromModel(
            await this.reportService.findOne(newReport.id),
        );
    }

    @Put(':reportId')
    @ApiOperation({ summary: 'Update report.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: ReportDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
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
            status: status?.name ?? report.reportStatus.name,
            studentId: student?.id ?? report.studentId,
            transportId: transport?.id ?? report.transportId,
            location: body.location ?? report.location,
            remark: body.remark,
            trafficErrors: body.trafficErrors,
        } as UpdateReportDto);

        return ReportDto.fromModel(await this.reportService.findOne(reportId));
    }
}
