import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class NotificationService {
    constructor(private readonly mailerService: MailerService) {}

    async sendRegistrationEmail(
        to: string,
        resetPasswordUrl: string,
    ): Promise<void> {
        await this.mailerService.sendMail({
            to,
            subject: 'New User',
            template: join(__dirname, '/template/registration'),
            context: {
                resetPasswordUrl,
            },
        });
    }

    async sendForgotPasswordEmail(
        to: string,
        resetPasswordUrl: string,
    ): Promise<void> {
        await this.mailerService.sendMail({
            to,
            subject: 'Forgot Password',
            template: join(__dirname, '/template/forgot-password'),
            context: {
                resetPasswordUrl,
            },
        });
    }
}
