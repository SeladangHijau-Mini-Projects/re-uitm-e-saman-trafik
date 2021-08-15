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
    Headers,
} from '@nestjs/common';
import { StudentService } from '../student/student.service';
import { TransportService } from '../transport/transport.service';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UserService } from '../user/user.service';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { ReportQueryParamDto } from './dto/report-query-param.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ReportDto } from './dto/report.dto';
import { UpdateTransportDto } from '../transport/dto/update-transport.dto';
import { PaginationBuilder } from 'src/common/pagination/builder.pagination';
import * as jwt from 'jsonwebtoken';

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
        type: [ReportDto],
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async find(
        @Query() query: ReportQueryParamDto,
    ): Promise<ReportDto[] | PaginationBuilder> {
        // pagination logic
        if (query?.paginationMeta) {
            const tempLimit = query?.limit;
            const tempPage = query?.page;
            const reportList = await this.reportService.findAll(
                new ReportQueryParamDto(),
            );

            query.limit = tempLimit;
            query.page = tempPage;

            return PaginationBuilder.build(reportList.length, query);
        }

        const reportList = await this.reportService.findAll(query);

        return reportList.map(ReportDto.fromModel);
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
    async create(
        @Headers('authorization') auth: string,
        @Body() body: CreateReportDto,
    ): Promise<ReportDto> {
        // validate user
        const authPayload = jwt.decode(auth);
        const userid = authPayload['userId'];
        const user = await this.userService.findOne(userid);
        if (!user) {
            throw new ResourceNotFoundException('User ID was not found.');
        }

        // create report
        const newReport = await this.reportService.create(user, body);

        console.log('newReport: ', newReport);

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
        const status = await this.reportService.findStatus(
            body?.status ?? report?.status?.code,
        );
        if (!status) {
            throw new ResourceNotFoundException('Status was not found.');
        }

        // validate user
        const user = await this.userService.findOne(
            body?.userId ?? report?.userId,
        );
        if (!user) {
            throw new ResourceNotFoundException('User ID not found.');
        }

        // TODO: fix this
        // // validate or create student
        // const student = body?.studentCode
        //     ? await this.studentService.updateByStudentCode(body.studentCode, {
        //           fullname: body.studentFullname,
        //           course: body.studentCourse,
        //           college: body.studentCollege,
        //       } as UpdateStudentDto)
        //     : report?.studentId
        //     ? await this.studentService.update(report?.studentId, {
        //           fullname: body.studentFullname,
        //           course: body.studentCourse,
        //           college: body.studentCollege,
        //       } as UpdateStudentDto)
        //     : null;
        // if (!student && body.studentCode) {
        //     throw new ResourceNotFoundException('Student not found.');
        // }

        // validate or create transport
        const transport = body?.transportPlateNo
            ? await this.transportService.updateByPlateNo(
                  body?.transportPlateNo,
                  {
                      code: body.transportCode,
                      status: body.transportStatus,
                  } as UpdateTransportDto,
              )
            : report?.transportId
            ? await this.transportService.update(report?.transportId, {
                  code: body.transportCode,
                  status: body.transportStatus,
              } as UpdateTransportDto)
            : null;
        if (!transport) {
            throw new ResourceNotFoundException('Transport was not found.');
        }

        // TODO: fix this
        // // update report
        // await this.reportService.update(report.id, {
        //     userId: user?.id ?? report.userId,
        //     status: status?.code ?? report.status.code,
        //     studentId: student?.id ?? report.studentId,
        //     transportId: transport?.id ?? report.transportId,
        //     location: body.location ?? report.location,
        //     remark: body.remark,
        //     trafficErrors: body.trafficErrors,
        // } as UpdateReportDto);

        // return ReportDto.fromModel(await this.reportService.findOne(reportId));
        return null;
    }
}
