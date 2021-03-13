import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsString,
    IsNumberString,
    IsOptional,
    IsBoolean,
} from 'class-validator';
import { UserRank } from '../enum/user-rank.enum';
import { UserType } from '../enum/user-type.enum';

export class UpdateUserDto {
    @ApiProperty({ description: 'User rank', enum: UserRank, example: 'UR1' })
    @IsEnum(UserRank)
    @IsOptional()
    readonly rank: string;

    @ApiProperty({ description: 'User type', enum: UserType, example: 'admin' })
    @IsEnum(UserType)
    @IsOptional()
    readonly type: string;

    @ApiProperty({ description: 'User staff code', example: 'K380' })
    @IsString()
    @IsOptional()
    readonly userCode: string;

    @ApiProperty({ description: 'User full name', example: 'John Doe' })
    @IsString()
    @IsOptional()
    readonly fullname: string;

    @ApiProperty({ description: 'User phone tel no', example: '0111234567' })
    @IsNumberString()
    @IsOptional()
    readonly phoneTelNo: string;

    @ApiProperty({ description: 'User office tel no', example: '044911234' })
    @IsNumberString()
    @IsOptional()
    readonly officeTelNo: string;

    @ApiProperty({
        description: 'User is first timer indicator',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    readonly firstTimer: boolean;
}
