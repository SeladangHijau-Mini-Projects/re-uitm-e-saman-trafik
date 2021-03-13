import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (
                configService: ConfigService,
            ): MysqlConnectionOptions => {
                return {
                    type: 'mysql',
                    host: configService.get<string>('MYSQL_HOST'),
                    port: configService.get<number>('MYSQL_PORT'),
                    username: configService.get<string>('MYSQL_USERNAME'),
                    password: configService.get<string>('MYSQL_PASSWORD'),
                    database: configService.get<string>('MYSQL_DATABASE'),
                    entities: ['dist/**/**/*.entity{.ts,.js}'],
                    logging: true,
                };
            },
        }),
    ],
})
export class DatabaseModule {}
