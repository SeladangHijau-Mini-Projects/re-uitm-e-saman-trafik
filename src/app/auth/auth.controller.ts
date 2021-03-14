import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ExistsException } from 'src/common/exception/exists.exception';
import { InvalidValueException } from 'src/common/exception/invalid-value.exception';
import { UnauthorizedException } from 'src/common/exception/unauthorized.exception';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
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
    ) {}

    @Post('login')
    async login(@Body() body: LoginDto): Promise<LoggedInDto> {
        const user = await this.userService.findOneByUserCode(body.username);

        if (user?.password != body.password) {
            throw new UnauthorizedException('Unauthorized user.');
        }

        const userToken = this.authService.generateToken(
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
            throw new ExistsException('User code exist.');
        }

        const newUser = await this.userService.create(body);
        const resetPasswordUrl = `${process.env.HOST}/forgot-password/${newUser.id}`; // TODO: need to generate a correct URL for reset password

        return {
            id: newUser.id,
            username: newUser.userCode,
            resetPasswordUrl,
        } as RegisteredDto;
    }

    @Post('forgot-password/:userId')
    async forgotPassword(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() body: PasswordResetDto,
    ): Promise<LoggedInDto> {
        const user = await this.userService.findOne(userId);

        if (body.password != body.confirmPassword) {
            throw new InvalidValueException(
                `Both password & confirmPassword field is not equal.`,
            );
        }
        if (user.password == body.password) {
            throw new InvalidValueException(
                'Password must not be the same as previously set.',
            );
        }

        const updatedUser = await this.userService.update(user, {
            password: body.password,
        } as UpdateUserDto);
        const userToken = this.authService.generateToken(
            updatedUser.id,
            updatedUser.userType.name,
        );

        return {
            userToken,
        } as LoggedInDto;
    }
}
