import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { BaseQueryParamDTO } from 'src/common/query-params/base-dto.queryparam';
import { TransportStatus } from '../enum/transport-status.enum';

export class TransportQueryParamDto extends BaseQueryParamDTO {
    @ApiProperty({ required: false, description: 'Transport ID', example: 1 })
    @IsNumber()
    @IsOptional()
    id: number;

    @ApiProperty({ required: false, description: 'Student ID', example: 1 })
    @IsNumber()
    @IsOptional()
    studentId: number;

    @ApiProperty({
        required: false,
        description: 'Transport status',
        enum: TransportStatus,
        example: TransportStatus.Hold,
    })
    @IsEnum(TransportStatus)
    @IsOptional()
    status: string;

    @ApiProperty({
        required: false,
        description: 'Transport status ID',
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    statusId: number;

    @ApiProperty({
        required: false,
        description: 'Plate no',
        example: 'QWE 123',
    })
    @IsString()
    @IsOptional()
    plateNo: string;

    @ApiProperty({
        required: false,
        description: 'Pass code',
        example: 'QWER1234',
    })
    @IsString()
    @IsOptional()
    passCode: string;

    @ApiProperty({
        required: false,
        description: 'Registered at',
        example: '2020-01-02 09:00:00',
    })
    @IsDate()
    @IsOptional()
    createdAt: Date;

    @ApiProperty({
        required: false,
        description: 'Updated at',
        example: '2020-01-02 09:00:00',
    })
    @IsDate()
    @IsOptional()
    updatedAt: Date;
}
