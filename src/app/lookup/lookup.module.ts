import { Module } from '@nestjs/common';
import { ReportModule } from '../report/report.module';
import { StudentModule } from '../student/student.module';
import { TrafficErrorModule } from '../traffic-error/traffic-error.module';
import { TransportModule } from '../transport/transport.module';
import { UserModule } from '../user/user.module';
import { LookupController } from './lookup.controller';
import { Lookupservice } from './lookup.service';

@Module({
    imports: [
        UserModule,
        ReportModule,
        TransportModule,
        StudentModule,
        TrafficErrorModule,
    ],
    controllers: [LookupController],
    providers: [Lookupservice],
})
export class LookupModule {}
