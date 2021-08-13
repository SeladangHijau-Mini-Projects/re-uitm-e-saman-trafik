import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { TransportStatus } from '../enum/transport-status.enum';
import { TransportType } from '../enum/transport-type.enum';
import { TransportEntity } from '../repository/transport.entity';

export class TransportDetailDto {
    @ApiProperty({ description: 'Report ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({ description: 'Student ID', example: 1 })
    @IsNumber()
    studentId: number;

    @ApiProperty({
        description: 'Transport type',
        enum: TransportType,
        example: TransportType.Car,
    })
    @IsEnum(TransportType)
    type: string;

    @ApiProperty({
        description: 'Transport status',
        enum: TransportStatus,
        example: TransportStatus.Locked,
    })
    @IsEnum(TransportStatus)
    status: string;

    @ApiProperty({ description: 'Transport plate no', example: 'QWE 123' })
    @IsString()
    plateNo: string;

    @ApiProperty({ description: 'Transport pass code', example: 'QWER1234' })
    @IsString()
    passCode: string;

    @ApiProperty({
        description: 'Transport registered date',
        example: '2020-12-02 09:00:00',
    })
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        description: 'Transport updated date',
        example: '2020-12-02 09:00:00',
    })
    @IsDate()
    updatedAt: Date;

    static fromModel(model: TransportEntity): TransportDetailDto {
        return {
            id: model?.id,
            studentId: model?.studentId,
            type: model?.transportType?.name,
            status: model?.transportStatus.name,
            plateNo: model?.plateNo,
            passCode: model?.passCode,
            createdAt: model?.createdAt,
            updatedAt: model?.updatedAt,
        } as TransportDetailDto;
    }
}
