import { Body, Controller, Post } from '@nestjs/common';
import { ExistsException } from 'src/common/exception/exists.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() body: CreateUserDto): Promise<UserDto> {
        const existingUser = await this.userService.findOneByUserCode(
            body.userCode,
        );

        if (existingUser) {
            throw new ExistsException('User code exist.');
        }

        const newUser = await this.userService.create(body);

        return UserDto.fromModel(newUser);
    }
}
