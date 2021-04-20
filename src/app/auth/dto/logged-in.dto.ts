import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoggedInDto {
    @ApiProperty({
        description: 'User token for logged in user',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE2MTg1OTQzMzAsImV4cCI6MTYxODY4MDczMH0.sJZZpfcSsIQFQemFWCLlhxYqRx9PrfzdUKN8ULoxZKA',
    })
    @IsString()
    @IsNotEmpty()
    userToken: string;
}
