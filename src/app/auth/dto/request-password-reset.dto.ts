import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/app/user/repository/user.entity';
import { AuthEntity } from '../repository/auth.entity';

export class RequestResetPasswordDto {
    @ApiProperty({
        description: 'User id',
        example: 1,
    })
    @IsNumber()
    userId: number;

    @ApiProperty({
        description: 'New password reset token',
        example: 'qewreqrew3243124',
    })
    @IsString()
    @IsNotEmpty()
    resetToken: string;

    static fromModel(
        user: UserEntity,
        auth: AuthEntity,
    ): RequestResetPasswordDto {
        return {
            userId: user?.id,
            resetToken: auth?.resetToken,
        } as RequestResetPasswordDto;
    }
}
