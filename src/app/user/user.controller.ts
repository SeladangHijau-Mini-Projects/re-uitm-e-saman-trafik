import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { QueryParamUserDto } from './dto/query-param-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(@Query() query: QueryParamUserDto): Promise<UserDto[]> {
        const userList = await this.userService.findAll(query);

        return userList.map(UserDto.fromModel);
    }

    @Get(':userId')
    async findOne(
        @Param('userId', ParseIntPipe) userId: number,
    ): Promise<UserDto> {
        const user = await this.userService.findOne(userId);

        if (!user) {
            throw new ResourceNotFoundException('User ID was not found.');
        }

        return UserDto.fromModel(user);
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
