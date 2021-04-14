import {
    Body,
    Controller,
    Param,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { ExistsException } from 'src/common/exception/exists.exception';
import { InvalidValueException } from 'src/common/exception/invalid-value.exception';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoggedInDto } from './dto/logged-in.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { RegisteredDto } from './dto/registered.dto';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly mailService: MailService,
    ) {}

    @Post('login')
    async login(@Body() body: LoginDto): Promise<LoggedInDto> {
        const user = await this.userService.findOneByUserCode(body.username);

        if (user?.password != body.password) {
            throw new UnauthorizedException('Unauthorized user.');
        }

        const userToken = this.authService.generateJwtToken(
            user.id,
            user.userType.name,
        );

        return {
            userToken,
        } as LoggedInDto;
    }

    @Post('register')
    async register(@Body() body: CreateUserDto): Promise<RegisteredDto> {
        const existingUser = await this.userService.findOneByUserCode(
            body.userCode,
        );

        if (existingUser) {
            throw new ExistsException(`User code '${body.userCode}' exist.`);
        }

        const newUser = await this.userService.create(body);
        const newAuth = await this.authService.generateAuth(
            newUser?.id,
            newUser?.userType?.name,
        );
        const resetPasswordUrl = `${process.env.HOST}/forgot-password/${newAuth.resetToken}`; // TODO: set real url for reset password

        // send email new account has been created
        await this.mailService.sendRegistrationEmail(
            'nadzmiidzham@gmail.com',
            resetPasswordUrl,
        );

        return {
            id: newUser.id,
            username: newUser.userCode,
            resetPasswordUrl,
        } as RegisteredDto;
    }

    @Post('forgot-password/:resetToken')
    async forgotPassword(
        @Param('resetToken') resetToken: string,
        @Body() body: PasswordResetDto,
    ): Promise<LoggedInDto> {
        if (body.password != body.confirmPassword) {
            throw new InvalidValueException(
                `Both password & confirmPassword field is not equal.`,
            );
        }

        const auth = await this.authService.findByResetToken(resetToken);
        if (!auth) {
            throw new ResourceNotFoundException('Reset token not found.');
        }

        const curAuth = await this.authService.findByResetToken(resetToken);
        const user = await this.userService.findOne(curAuth.userId);

        await this.authService.resetPassword(curAuth.id, body.password);

        const userToken = this.authService.generateJwtToken(
            user.id,
            user.userType.name,
        );

        return {
            userToken,
        } as LoggedInDto;
    }
}
