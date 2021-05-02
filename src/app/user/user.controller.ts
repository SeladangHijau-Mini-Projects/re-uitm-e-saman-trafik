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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { QueryParamUserDto } from './dto/query-param-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSummaryDto } from './dto/user-summary.dto';
import { UserDetailDto } from './dto/user-detail.dto';
import { UserService } from './user.service';
import { PaginationBuilder } from 'src/common/pagination/builder.pagination';

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Get multiple user.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: [UserSummaryDto],
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async findAll(
        @Query() query: QueryParamUserDto,
    ): Promise<UserSummaryDto[] | PaginationBuilder> {
        let userList = [];

        // pagination logic
        if (query?.paginationMeta) {
            const tempLimit = query?.limit;
            const tempPage = query?.page;

            query.limit = tempLimit;
            query.page = tempPage;
            userList = await this.userService.findAll(new QueryParamUserDto());

            return PaginationBuilder.build(userList.length, query);
        }

        userList = await this.userService.findAll(query);

        return userList.map(UserSummaryDto.fromModel);
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Get single user.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: UserDetailDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async findOne(
        @Param('userId', ParseIntPipe) userId: number,
    ): Promise<UserDetailDto> {
        const user = await this.userService.findOne(userId);

        if (!user) {
            throw new ResourceNotFoundException('User ID was not found.');
        }

        return UserDetailDto.fromModel(user);
    }

    @Put(':userId')
    @ApiOperation({ summary: 'Update user.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: UserDetailDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async update(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() body: UpdateUserDto,
    ): Promise<UserDetailDto> {
        const user = await this.userService.findOne(userId);

        if (!user) {
            throw new ResourceNotFoundException('User ID not found.');
        }

        const updatedUser = await this.userService.update(user, body);

        return UserDetailDto.fromModel(updatedUser);
    }
}
