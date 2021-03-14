import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from 'nest-router';
import { DatabaseModule } from '../database/database.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
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
        ],
    },
];

@Module({
    imports: [
        RouterModule.forRoutes(routes),
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        HealthModule,
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}
