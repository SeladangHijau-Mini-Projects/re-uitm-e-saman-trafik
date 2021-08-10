import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ReportModule } from './report/report.module';
import { StudentModule } from './student/student.module';
import { TransportModule } from './transport/transport.module';
import { TrafficErrorModule } from './traffic-error/traffic-error.module';
import { MailModule } from './mail/mail.module';
import { LookupModule } from './lookup/lookup.module';
import { RouterModule } from './router.module';

@Module({
    imports: [
        RouterModule,
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        HealthModule,
        UserModule,
        AuthModule,
        ReportModule,
        StudentModule,
        TransportModule,
        TrafficErrorModule,
        MailModule,
        LookupModule,
    ],
})
export class AppModule {}
