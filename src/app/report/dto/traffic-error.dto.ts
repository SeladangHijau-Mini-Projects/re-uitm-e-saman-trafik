import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { TrafficErrorEntity } from 'src/app/traffic-error/repository/traffic-error.entity';

export class TrafficErrorDto {
    @ApiProperty({ description: 'error name', example: 'e1' })
    @IsNumber()
    name: string;

    @ApiProperty({
        description: 'Report description',
        example: 'Menghalang Laluan',
    })
    @IsString()
    description: string;

    static fromModel(model: TrafficErrorEntity): TrafficErrorDto {
        return {
            name: model?.name,
            description: model?.description,
        } as TrafficErrorDto;
    }
}
