import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TransportStatus } from '../enum/transport-status.enum';
import { TransportStatusEntity } from '../repository/transport-status.entity';

export class TransportStatusDto {
    @ApiProperty({ description: 'Transport Status Id', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'Transport status code',
        example: TransportStatus.Hold,
        enum: TransportStatus,
    })
    @IsEnum(TransportStatus)
    code: TransportStatus;

    @ApiProperty({
        description: 'Transport Status description',
        example: 'New',
    })
    @IsString()
    description: string;

    static fromModel(model: TransportStatusEntity): TransportStatusDto {
        return {
            id: model?.id,
            code: model?.code,
            description: model?.description,
        } as TransportStatusDto;
    }
}
