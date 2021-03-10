import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { LoggerModule } from '../../common/logger/logger.module';

@Module({
    imports: [TerminusModule, LoggerModule],
    providers: [],
    controllers: [HealthController],
})
export class HealthModule {}
