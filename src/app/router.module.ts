import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ReportModule } from './report/report.module';
import { TransportModule } from './transport/transport.module';
import { LookupModule } from './lookup/lookup.module';
import { RouterModule as RM } from 'nest-router';

// eslint-disable-next-line @typescript-eslint/naming-convention
const RouterModule = RM.forRoutes([
    {
        path: '/v1',
        children: [
            {
                path: '/health',
                module: HealthModule,
            },
            {
                path: '/auth',
                module: AuthModule,
            },
            {
                path: '/user',
                module: UserModule,
            },
            {
                path: '/report',
                module: ReportModule,
            },
            {
                path: '/lookup',
                module: LookupModule,
            },
            {
                path: '/transport',
                module: TransportModule,
            },
        ],
    },
]);

export { RouterModule };
