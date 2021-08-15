import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { TrafficErrorEntity } from '../repository/traffic-error.entity';

export class TrafficErrorDto {
    @ApiProperty({ name: 'Traffic error id' })
    @IsNumber()
    id: number;

    @ApiProperty({ name: 'Traffic error code' })
    @IsString()
    code: string;

    @ApiProperty({ name: 'Traffic error description' })
    @IsString()
    description: string;

    static fromModel(model: TrafficErrorEntity): TrafficErrorDto {
        return {
            id: model?.id,
            code: model?.code,
            description: model?.description,
        } as TrafficErrorDto;
    }
}
