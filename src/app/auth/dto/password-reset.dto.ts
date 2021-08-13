import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordResetDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

    @IsString()
    @IsNotEmpty()
    resetToken: string;
}
