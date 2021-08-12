import {
    Body,
    Controller,
    Param,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExistsException } from 'src/common/exception/exists.exception';
import { InvalidValueException } from 'src/common/exception/invalid-value.exception';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { NotificationService } from '../notification/notification.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoggedInDto } from './dto/logged-in.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { RegisteredDto } from './dto/registered.dto';
import { RequestResetPasswordDto } from './dto/request-password-reset.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly notificationService: NotificationService,
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
        const user = await this.userService.findOneByCode(body?.username);
        if (!user) {
            throw new ResourceNotFoundException('User not found.');
        }

        const auth = await this.authService.findOneByUserId(user?.id);
        if (auth?.password != body.password) {
            throw new UnauthorizedException('Unauthorized user.');
        }

        const userToken = this.authService.generateJwtToken(
            user?.id,
            user?.userType?.code,
        );

        return LoggedInDto.fromModel(user, userToken);
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
        const existingUser = await this.userService.findOneByCode(body?.code);

        if (existingUser) {
            throw new ExistsException(`User code '${body?.code}' exist.`);
        }

        const newUser = await this.userService.create(body);
        const newAuth = await this.authService.generateAuth(
            newUser?.id,
            newUser?.userType?.code,
        );
        const userToken = this.authService.generateJwtToken(
            newUser?.id,
            newUser?.userType?.code,
        );

        // send registration email
        const resetPasswordUrl = `${this.configService.get<string>('HOST')}/${
            newUser?.id
        }/reset-password?token=${newAuth.resetToken}`;

        await this.notificationService.sendRegistrationEmail(
            newUser?.email,
            resetPasswordUrl,
        );

        return RegisteredDto.fromModel(newUser, newAuth, userToken);
    }

    @Post(':userId/forgot-password')
    @ApiOperation({ summary: 'Set new password.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: RequestResetPasswordDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async requestResetPassword(
        @Param('userId') userId: number,
    ): Promise<RequestResetPasswordDto> {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new ResourceNotFoundException(
                `User id = '${userId}' was not found.`,
            );
        }

        const newAuth = await this.authService.generateAuth(
            user?.id,
            user?.userType?.code,
        );

        // send forgot password email
        const resetPasswordUrl = `${this.configService.get<string>('HOST')}/${
            user?.id
        }/reset-password?token=${newAuth.resetToken}`;

        await this.notificationService.sendForgotPasswordEmail(
            user?.email,
            resetPasswordUrl,
        );

        return RequestResetPasswordDto.fromModel(user, newAuth);
    }

    @Post(':userId/reset-password')
    @ApiOperation({ summary: 'Set new password.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: LoggedInDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async resetPassword(
        @Param('userId') userId: number,
        @Body() body: PasswordResetDto,
    ): Promise<LoggedInDto> {
        if (body.password != body.confirmPassword) {
            throw new InvalidValueException(
                `Both password & confirmPassword field is not equal.`,
            );
        }

        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new ResourceNotFoundException(
                `User id = ${userId} was not found`,
            );
        }

        const auth = await this.authService.findByUserIdAndResetToken(
            userId,
            body?.resetToken,
        );
        if (!auth) {
            throw new ResourceNotFoundException(
                `Reset token not found for user id = ${userId}.`,
            );
        }

        await this.authService.resetPassword(auth?.id, body?.password);

        const userToken = this.authService.generateJwtToken(
            user?.id,
            user?.userType?.code,
        );

        return LoggedInDto.fromModel(user, userToken);
    }
}
