import { Module } from '@nestjs/common';
import { LoggerService } from 'nest-logger';
import { AppLogger } from './logger.service';

@Module({
    providers: [
        {
            provide: AppLogger,
            useFactory: (): LoggerService => {
                const logLevel =
                    process.env.NODE_ENV !== 'production' ||
                    process.env.DEBUG === 'true'
                        ? 'debug'
                        : 'info';
                const loggers = [
                    LoggerService.console({
                        timeFormat: 'dd/MM/YYYY HH:mm:ss',
                        consoleOptions: {
                            level: logLevel,
                        },
                    }),
                ];

                return new AppLogger(logLevel, loggers);
            },
        },
    ],
    exports: [AppLogger],
})
export class LoggerModule {}
