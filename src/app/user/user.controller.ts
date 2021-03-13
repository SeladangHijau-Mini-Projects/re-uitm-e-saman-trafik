import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ExistsException } from 'src/common/exception/exists.exception';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

    @Put(':userId')
    async update(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() body: UpdateUserDto,
    ): Promise<UserDto> {
        const user = await this.userService.findOne(userId);

        if (!user) {
            throw new ResourceNotFoundException('User ID not found.');
        }

        const updatedUser = await this.userService.update(user, body);

        return UserDto.fromModel(updatedUser);
    }
}
