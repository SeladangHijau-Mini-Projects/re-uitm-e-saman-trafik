import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { TransportEntity } from '../repository/transport.entity';
import { TransportStatusDto } from './transport-status.dto';

export class TransportDto {
    @ApiProperty({ description: 'Report ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({ description: 'Transport status' })
    @IsObject()
    status: TransportStatusDto;

    @ApiProperty({ description: 'Transport pass code', example: 'QWER1234' })
    @IsString()
    code: string;

    @ApiProperty({ description: 'Transport plate no', example: 'QWE 123' })
    @IsString()
    plateNo: string;

    static fromModel(model: TransportEntity): TransportDto {
        return {
            id: model?.id,
            status: model?.status,
            code: model?.code,
            plateNo: model?.plateNo,
        } as TransportDto;
    }
}
