import { ApiProperty } from '@nestjs/swagger';

class Error {
    @ApiProperty()
    type: string;

    @ApiProperty()
    code: number;

    @ApiProperty()
    message: string;
}

export class ResponseDTO<T> {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    data: T[];

    @ApiProperty({ type: Error })
    error: Error;
}
