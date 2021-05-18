import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryParamDTO } from 'src/common/query-params/base-dto.queryparam';
import { ReportStatus } from '../enum/report-status.enum';

export class ReportQueryParamDto extends BaseQueryParamDTO {
    @ApiProperty({
        required: false,
        description: 'Report status',
        enum: ReportStatus,
        example: ReportStatus.New,
    })
    @IsEnum(ReportStatus)
    @IsOptional()
    status: string;

    @ApiProperty({
        required: false,
        description: 'Report status ID',
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    statusId: number;

    @ApiProperty({
        required: false,
        description: 'Transport plate no',
        example: 'QWE 123',
    })
    @IsString()
    @IsOptional()
    transportPlateNo: string;

    @ApiProperty({ required: false, description: 'Transport ID', example: 1 })
    @IsNumber()
    @IsOptional()
    transportId: number;

    @ApiProperty({
        required: false,
        description: 'Student Code',
        example: '2015125573',
    })
    @IsString()
    @IsOptional()
    studentCode: string;

    @ApiProperty({ required: false, description: 'Student ID', example: 1 })
    @IsNumber()
    @IsOptional()
    studentId: number;

    @ApiProperty({ required: false, description: 'User code', example: 'K380' })
    @IsString()
    @IsOptional()
    userCode: string;

    @ApiProperty({ required: false, description: 'User ID', example: 1 })
    @IsNumber()
    @IsOptional()
    userId: number;

    @ApiProperty({
        required: false,
        description: 'Location reported',
        example: 'UiTM',
    })
    @IsString()
    @IsOptional()
    location: string;
}
