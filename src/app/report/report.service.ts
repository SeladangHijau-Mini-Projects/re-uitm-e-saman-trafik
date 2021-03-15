import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentService } from '../student/student.service';
import { TransportService } from '../transport/transport.service';
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
        private readonly studentService: StudentService,
        private readonly transportService: TransportService,
    ) {}
}
