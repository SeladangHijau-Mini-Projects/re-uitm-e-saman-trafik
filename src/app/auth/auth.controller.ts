import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ExistsException } from 'src/common/exception/exists.exception';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoggedInDto } from './dto/logged-in.dto';
import { LoginDto } from './dto/login.dto';
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
        const resetPasswordUrl = `${process.env.HOST}/forgot-password/${newUser.id}`;

        return {
            id: newUser.id,
            username: newUser.userCode,
            resetPasswordUrl,
        } as RegisteredDto;
    }
}
