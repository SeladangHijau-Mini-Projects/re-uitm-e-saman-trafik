import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from '../student/student.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportHistoryEntity } from './repository/report-history.entity';
import { ReportStatusEntity } from './repository/report-status.entity';
import { ReportEntity } from './repository/report.entity';
import { TransportModule } from '../transport/transport.module';
import { TrafficErrorModule } from '../traffic-error/traffic-error.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ReportEntity,
            ReportHistoryEntity,
            ReportStatusEntity,
        ]),
        StudentModule,
        TransportModule,
        TrafficErrorModule,
    ],
    controllers: [ReportController],
    providers: [ReportService],
    exports: [ReportService],
})
export class ReportModule {}
