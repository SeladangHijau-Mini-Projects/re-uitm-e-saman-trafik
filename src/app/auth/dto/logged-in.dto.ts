import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/app/user/repository/user.entity';

export class LoggedInDto {
    @ApiProperty({
        description: 'User id for logged in user',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        description: 'User token for logged in user',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE2MTg1OTQzMzAsImV4cCI6MTYxODY4MDczMH0.sJZZpfcSsIQFQemFWCLlhxYqRx9PrfzdUKN8ULoxZKA',
    })
    @IsString()
    @IsNotEmpty()
    userToken: string;

    static fromModel(user: UserEntity, userToken: string): LoggedInDto {
        return {
            userId: user?.id,
            userToken,
        } as LoggedInDto;
    }
}
