import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { TransportEntity } from '../repository/transport.entity';

export class TransportSummaryDto {
    @ApiProperty({ description: 'Report ID', example: 1 })
    @IsNumber()
    id: number;

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
    code: string;

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
            status: model?.status.description,
            plateNo: model?.plateNo,
            code: model?.code,
            createdAt: model?.createdAt,
            updatedAt: model?.updatedAt,
        } as TransportSummaryDto;
    }
}
