import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisteredDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    resetPasswordUrl: string;
}
