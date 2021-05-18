import { ApiProperty } from '@nestjs/swagger';
import {
    IsBooleanString,
    IsEnum,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';
import { BaseQueryParamDTO } from 'src/common/query-params/base-dto.queryparam';
import { UserRank } from '../enum/user-rank.enum';
import { UserType } from '../enum/user-type.enum';

export class QueryParamUserDto extends BaseQueryParamDTO {
    @ApiProperty({
        required: false,
        description: 'User rank',
        enum: UserRank,
        example: 'ur1',
    })
    @IsEnum(UserRank)
    @IsOptional()
    readonly rank: string;

    @ApiProperty({ required: false, description: 'User rank ID', example: 1 })
    @IsNumber()
    @IsOptional()
    readonly rankId: number;

    @ApiProperty({
        required: false,
        description: 'User type',
        enum: UserType,
        example: 'admin',
    })
    @IsEnum(UserType)
    @IsOptional()
    readonly type: string;

    @ApiProperty({ required: false, description: 'User type ID', example: 1 })
    @IsNumber()
    @IsOptional()
    readonly typeId: number;

    @ApiProperty({
        required: false,
        description: 'User staff code',
        example: 'K380',
    })
    @IsString()
    @IsOptional()
    readonly userCode: string;

    @ApiProperty({
        required: false,
        description: 'User full name',
        example: 'John Doe',
    })
    @IsString()
    @IsOptional()
    readonly fullname: string;

    @ApiProperty({
        required: false,
        description: 'User phone tel no',
        example: '0111234567',
    })
    @IsNumberString()
    @IsOptional()
    readonly phoneTelNo: string;

    @ApiProperty({
        required: false,
        description: 'User office tel no',
        example: '044911234',
    })
    @IsNumberString()
    @IsOptional()
    readonly officeTelNo: string;

    @ApiProperty({
        required: false,
        description: 'User is first timer indicator',
        example: true,
    })
    @IsBooleanString()
    @IsOptional()
    readonly firstTimer: string;
}
