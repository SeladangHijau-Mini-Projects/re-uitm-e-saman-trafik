import { IsNotEmpty, IsString } from 'class-validator';

export class LoggedInDto {
    @IsString()
    @IsNotEmpty()
    userToken: string;
}
