import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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
}
