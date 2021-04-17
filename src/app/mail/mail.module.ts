import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
                        dir: join(__dirname, 'template'),
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                };
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
