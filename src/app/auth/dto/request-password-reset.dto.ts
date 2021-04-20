import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestPasswordResetDto {
    @ApiProperty({
        description: 'New password reset token',
        example: 'qewreqrew3243124',
    })
    @IsString()
    @IsNotEmpty()
    resetToken: string;

    @ApiProperty({
        description: 'URL to reset password page',
        example: 'http://localhost/reset',
    })
    @IsString()
    resetPasswordUrl: string;
}
