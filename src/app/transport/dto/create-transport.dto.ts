import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransportStatus } from '../enum/transport-status.enum';
import { TransportType } from '../enum/transport-type.enum';

export class CreateTransportDto {
    @ApiProperty({
        name: 'Student ID',
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    studentId: number;

    @ApiProperty({
        name: 'Transport type',
        enum: TransportType,
        example: TransportType.Car,
    })
    @IsEnum(TransportType)
    type: string;

    @ApiProperty({
        name: 'Transport status',
        enum: TransportStatus,
        example: TransportStatus.Na,
    })
    @IsEnum(TransportStatus)
    status: string = TransportStatus.Na;

    @ApiProperty({
        name: 'Transport plate no',
        example: 'QWE 123',
    })
    @IsString()
    plateNo: string;

    @ApiProperty({
        name: `Student's transport pass code`,
        example: 'K123234W1234',
    })
    @IsString()
    passCode: string;
}
