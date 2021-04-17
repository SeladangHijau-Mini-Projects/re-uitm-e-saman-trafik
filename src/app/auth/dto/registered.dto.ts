import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisteredDto {
    @ApiProperty({ description: 'New User ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'New user username',
        example: 'K380',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'URL to reset password page',
        example: 'http://localhost/reset',
    })
    @IsString()
    resetPasswordUrl: string;
}
