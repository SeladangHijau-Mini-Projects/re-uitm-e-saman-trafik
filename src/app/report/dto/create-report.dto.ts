import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReportStatus } from '../enum/report-status.enum';

export class CreateReportDto {
    @ApiProperty({
        name: 'Report Status',
        enum: ReportStatus,
        example: ReportStatus.New,
    })
    @IsEnum(ReportStatus)
    status: string;

    @ApiProperty({
        name: 'Transport ID',
        example: 1,
    })
    @IsNumber()
    transportId: number;

    @ApiProperty({
        name: 'User ID',
        example: 1,
    })
    @IsNumber()
    userId: number;

    @ApiProperty({
        name: 'Student ID',
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    studentId: number;

    @ApiProperty({
        name: 'Location',
        example: 'UiTM',
    })
    @IsString()
    location: string;

    @ApiProperty({
        name: 'Report remark',
        example: 'UiTM',
    })
    @IsString()
    remark: string;

    @ApiProperty({ name: 'Traffic error name' })
    @IsString({ each: true })
    trafficErrorList: string[];
}
