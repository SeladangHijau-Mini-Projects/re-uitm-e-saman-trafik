import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryParamDTO } from 'src/common/query-params/base-dto.queryparam';
import { ReportStatus } from '../enum/report-status.enum';

export class ReportQueryParamDto extends BaseQueryParamDTO {
    @ApiProperty()
    @IsEnum(ReportStatus)
    @IsOptional()
    status: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    statusId: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    transportPlateNo: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    transportId: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    studentCode: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    studentId: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    userCode: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    userId: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    location: string;
}
