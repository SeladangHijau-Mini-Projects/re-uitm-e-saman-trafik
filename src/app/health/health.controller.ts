import { Controller, Get } from '@nestjs/common';
import {
    HealthCheckService,
    HealthIndicatorResult,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { HealthCheckResult } from '@nestjs/terminus/dist/health-check';
import { AppLogger } from '../../common/logger/logger.service';

@Controller()
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly typeormHealth: TypeOrmHealthIndicator,
        private readonly logger: AppLogger,
    ) {
        this.logger.setContext(HealthController.name);
    }

    @Get()
    async index(): Promise<HealthCheckResult> {
        this.logger.info('Health check triggered');
        return this.health.check([
            (): Promise<HealthIndicatorResult> =>
                this.typeormHealth.pingCheck('mysqldb'),
        ]);
    }
}
