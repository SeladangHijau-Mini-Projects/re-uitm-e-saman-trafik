import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendRegistrationEmail(
        to: string,
        resetPasswordUrl: string,
    ): Promise<void> {
        await this.mailerService.sendMail({
            to,
            subject: 'New User',
            template: 'registration',
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
            template: 'forgot-password',
            context: {
                resetPasswordUrl,
            },
        });
    }
}
