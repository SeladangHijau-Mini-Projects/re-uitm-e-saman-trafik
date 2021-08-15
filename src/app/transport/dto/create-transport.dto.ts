import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TransportStatus } from '../enum/transport-status.enum';

export class CreateTransportDto {
    @ApiProperty({
        name: 'Transport status',
        enum: TransportStatus,
        example: TransportStatus.Hold,
    })
    @IsEnum(TransportStatus)
    status: string = TransportStatus.Hold;

    @ApiProperty({
        name: `Student's transport pass code`,
        example: 'K123234W1234',
    })
    @IsString()
    code: string;

    @ApiProperty({
        name: 'Transport plate no',
        example: 'QWE 123',
    })
    @IsString()
    plateNo: string;
}
