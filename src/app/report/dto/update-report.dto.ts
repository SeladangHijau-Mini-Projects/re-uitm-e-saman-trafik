import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsEnum,
    IsNumber,
    IsNotEmpty,
} from 'class-validator';
import { ReportStatus } from '../enum/report-status.enum';

export class UpdateReportDto {
    @ApiProperty({
        description: 'User ID',
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    userId: number;

    @ApiProperty({
        description: 'Report status',
        enum: ReportStatus,
        example: ReportStatus.Assigned,
    })
    @IsEnum(ReportStatus)
    @IsOptional()
    status: string;

    @ApiProperty({
        description: 'Student ID',
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    studentId: number;

    @ApiProperty({
        description: 'Transport ID',
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    transportId: number;

    @ApiProperty({ description: 'Report location', example: 'UiTM' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    location: string;

    @ApiProperty({ description: 'Report remark', example: 'Saja je' })
    @IsString()
    @IsNotEmpty()
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
