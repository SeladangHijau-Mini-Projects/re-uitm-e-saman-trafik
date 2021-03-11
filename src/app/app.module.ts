import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from 'nest-router';
import { DatabaseModule } from '../database/database.module';
import { HealthModule } from './health/health.module';

const routes: Routes = [
    {
        path: '/v1',
        children: [
            {
                path: '/health',
                module: HealthModule,
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
    ],
})
export class AppModule {}
