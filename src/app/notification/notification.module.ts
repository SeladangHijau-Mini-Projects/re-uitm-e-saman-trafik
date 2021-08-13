import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationService } from './notification.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): MailerOptions => {
                return {
                    transport: {
                        host: configService.get<string>('MAIL_HOST'),
                        secure: false,
                        auth: {
                            user: configService.get<string>('MAIL_USERNAME'),
                            pass: configService.get<string>('MAIL_PASSWORD'),
                        },
                    },
                    defaults: {
                        from: `"No Reply" <${configService.get<string>(
                            'MAIL_FROM',
                        )}>`,
                    },
                    template: {
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                };
            },
        }),
    ],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
