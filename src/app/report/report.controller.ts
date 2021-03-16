import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportDto } from './dto/report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportService } from './report.service';

@Controller()
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Post()
    async create(@Body() body: CreateReportDto): Promise<ReportDto> {
        const newReport = await this.reportService.create(body);

        return ReportDto.fromModel(newReport);
    }

    @Put(':reportId')
    async update(
        @Param('reportId', ParseIntPipe) reportId: number,
        @Body() body: UpdateReportDto,
    ): Promise<ReportDto> {
        console.log(await reportId);
        console.log(await body);
        return null;
    }
}
