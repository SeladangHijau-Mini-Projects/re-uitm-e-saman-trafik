import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    ) {}

    async create(dto: CreateReportDto): Promise<ReportEntity> {
        const status = await this.reportStatusRepository.findOne({
            name: dto.status,
        });

        // create new report
        let report = await this.reportRepository.save({
            status,
            transportId: dto.transportId,
            userId: dto.userId,
            studentId: dto.studentId,
            location: dto.location,
        } as ReportEntity);

        // create new report history
        let reportHistory = null;
        if (report) {
            reportHistory = await this.reportHistoryRepository.save({
                reportId: report.id,
                statusId: report.statusId,
                userId: report.userId,
                transportId: report.transportId,
                location: report.location,
                remark: dto.remark,
            } as ReportHistoryEntity);
        }

        if (reportHistory) {
            report = {
                ...report,
                histories: [reportHistory],
            } as ReportEntity;
        }

        return report;
    }

    async update(dto: UpdateReportDto): Promise<ReportEntity> {
        console.log(await dto);
        return null;
    }
}
