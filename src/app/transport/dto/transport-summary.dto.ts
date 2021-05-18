import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { TransportEntity } from '../repository/transport.entity';

export class TransportSummaryDto {
    @ApiProperty({ description: 'Report ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({ description: 'Student ID', example: 1 })
    @IsNumber()
    studentId: number;

    @ApiProperty({
        description: 'Transport type',
        example: 'Kereta',
    })
    @IsString()
    type: string;

    @ApiProperty({
        description: 'Transport status',
        example: 'Dikunci',
    })
    @IsString()
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

    static fromModel(model: TransportEntity): TransportSummaryDto {
        return {
            id: model?.id,
            studentId: model?.studentId,
            type: model?.transportType?.description,
            status: model?.transportStatus.description,
            plateNo: model?.plateNo,
            passCode: model?.passCode,
            createdAt: model?.createdAt,
            updatedAt: model?.updatedAt,
        } as TransportSummaryDto;
    }
}
