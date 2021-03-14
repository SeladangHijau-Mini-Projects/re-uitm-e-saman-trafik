import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ExistsException } from 'src/common/exception/exists.exception';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
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
