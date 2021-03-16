import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateReportDto {
    @ApiProperty({ description: 'Report location', example: 'UiTM' })
    @IsString()
    @IsOptional()
    location: string;

    @ApiProperty({ description: 'Report remark', example: 'Saja je' })
    @IsString()
    @IsOptional()
    remark: string;

    @ApiProperty({
        description: 'Traffic errors',
        example: ['e1', 'e2'],
    })
    @IsString({ each: true })
    @IsOptional()
    trafficErrors: string[];
}
