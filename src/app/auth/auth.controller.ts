import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoggedInDto } from './dto/logged-in.dto';
import { LoginDto } from './dto/login.dto';

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
}
