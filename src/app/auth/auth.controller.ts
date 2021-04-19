import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
    ) {}

    @Post('login')
    @ApiOperation({ summary: 'Login user.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: LoggedInDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async login(@Body() body: LoginDto): Promise<LoggedInDto> {
        const user = await this.userService.findOneByUserCode(body.username);
        if (!user) {
            throw new ResourceNotFoundException('User not found.');
        }

        const auth = await this.authService.findOneByUserId(user.id);
        if (auth?.password != body.password) {
            throw new UnauthorizedException('Unauthorized user.');
        }

        const userToken = this.authService.generateJwtToken(
            user.id,
            user.userType.name,
        );

        return {
            userId: user.id,
            userToken,
        } as LoggedInDto;
    }

    @Post('register')
    @ApiOperation({ summary: 'Register new user.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: RegisteredDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
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
        const resetPasswordUrl = `${this.configService.get<string>(
            'APP_RESET_PASSWORD_URL',
        )}?token=${newAuth.resetToken}`;

        // send registration email
        await this.mailService.sendRegistrationEmail(
            newUser.email,
            resetPasswordUrl,
        );

        return {
            id: newUser.id,
            username: newUser.userCode,
            resetPasswordUrl,
        } as RegisteredDto;
    }

    @Get(':userId/reset-password')
    @ApiOperation({ summary: 'Set new password.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: LoggedInDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async requestForgotPassword(
        @Param('userId') userId: number,
    ): Promise<RequestPasswordResetDto> {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new ResourceNotFoundException(
                `User ID '${userId}' was not found.`,
            );
        }

        const newAuth = await this.authService.generateAuth(
            user.id,
            user.userType.name,
        );
        const resetPasswordUrl = `${this.configService.get<string>(
            'APP_RESET_PASSWORD_URL',
        )}?token=${newAuth.resetToken}`;

        // send registration email
        await this.mailService.sendForgotPasswordEmail(
            user.email,
            resetPasswordUrl,
        );

        return {
            resetToken: newAuth.resetToken,
            resetPasswordUrl,
        } as RequestPasswordResetDto;
    }

    @Post('reset-password/:resetToken')
    @ApiOperation({ summary: 'Set new password.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: LoggedInDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
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
