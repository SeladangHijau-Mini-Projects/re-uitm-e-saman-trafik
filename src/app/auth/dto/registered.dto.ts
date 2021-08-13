import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';
import { UserEntity } from 'src/app/user/repository/user.entity';
import { AuthEntity } from '../repository/auth.entity';

export class RegisteredDto {
    @ApiProperty({ description: 'New User ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({ description: 'User staff code', example: 'K380' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'User full name', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'User mobile tel no', example: '0111234567' })
    @IsNumberString()
    @IsOptional()
    mobileTelNo: string;

    @ApiProperty({ description: 'User office tel no', example: '044911234' })
    @IsNumberString()
    @IsNotEmpty()
    officeTelNo: string;

    @ApiProperty({ description: 'User email', example: 'test@email.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'User login token', example: 'xxxx.xxxx.xxxx' })
    @IsString()
    @IsNotEmpty()
    userToken: string;

    @ApiProperty({
        description: 'User reset password token',
        example: 'xxxx.xxxx.xxxx',
    })
    @IsString()
    @IsNotEmpty()
    resetToken: string;

    static fromModel(
        user: UserEntity,
        auth: AuthEntity,
        userToken: string,
    ): RegisteredDto {
        return {
            id: user?.id,
            code: user?.code,
            name: user?.name,
            mobileTelNo: user?.mobileTelNo,
            officeTelNo: user?.officeTelNo,
            email: user?.email,
            userToken,
            resetToken: auth?.resetToken,
        } as RegisteredDto;
    }
}
