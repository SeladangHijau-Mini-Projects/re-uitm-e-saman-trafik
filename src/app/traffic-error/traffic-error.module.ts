import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportTrafficErrorEntity } from '../report/repository/report-traffic-error.entity';
import { TrafficErrorEntity } from './repository/traffic-error.entity';
import { TrafficErrorService } from './traffic-error.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TrafficErrorEntity,
            ReportTrafficErrorEntity,
        ]),
    ],
    providers: [TrafficErrorService],
    exports: [TrafficErrorService],
})
export class TrafficErrorModule {}
