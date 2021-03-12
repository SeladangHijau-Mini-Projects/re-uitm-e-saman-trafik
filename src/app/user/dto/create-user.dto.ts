import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNumberString, IsOptional } from 'class-validator';
import { UserRank } from '../enum/user-rank.enum';
import { UserType } from '../enum/user-type.enum';

export class CreateUserDto {
    @ApiProperty({ description: 'User rank', enum: UserRank, example: 'ur1' })
    @IsEnum(UserRank)
    readonly rank: string;

    @ApiProperty({ description: 'User type', enum: UserType, example: 'admin' })
    @IsEnum(UserType)
    readonly type: string;

    @ApiProperty({ description: 'User staff code', example: 'K380' })
    @IsString()
    readonly userCode: string;

    @ApiProperty({ description: 'User full name', example: 'John Doe' })
    @IsString()
    readonly fullname: string;

    @ApiProperty({ description: 'User phone tel no', example: '0111234567' })
    @IsNumberString()
    @IsOptional()
    readonly phoneTelNo: string;

    @ApiProperty({ description: 'User office tel no', example: '044911234' })
    @IsNumberString()
    readonly officeTelNo: string;
}
