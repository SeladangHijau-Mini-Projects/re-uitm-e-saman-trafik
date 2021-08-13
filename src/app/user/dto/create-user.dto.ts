import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsString,
    IsNumberString,
    IsOptional,
    IsNotEmpty,
} from 'class-validator';
import { UserType } from '../enum/user-type.enum';

export class CreateUserDto {
    @ApiProperty({ description: 'User type', enum: UserType, example: 'admin' })
    @IsEnum(UserType)
    @IsNotEmpty()
    readonly type: string;

    @ApiProperty({ description: 'User staff code', example: 'K380' })
    @IsString()
    @IsNotEmpty()
    readonly code: string;

    @ApiProperty({ description: 'User full name', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ description: 'User mobile tel no', example: '0111234567' })
    @IsNumberString()
    @IsOptional()
    readonly mobileTelNo: string;

    @ApiProperty({ description: 'User office tel no', example: '044911234' })
    @IsNumberString()
    @IsNotEmpty()
    readonly officeTelNo: string;

    @ApiProperty({ description: 'User email', example: 'test@email.com' })
    @IsString()
    @IsNotEmpty()
    readonly email: string;
}
