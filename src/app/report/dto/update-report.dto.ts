import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsEnum,
    IsNumber,
    IsNotEmpty,
} from 'class-validator';
import { College } from 'src/app/student/enum/college.enum';
import { Course } from 'src/app/student/enum/course.enum';
import { TransportStatus } from 'src/app/transport/enum/transport-status.enum';
import { TransportType } from 'src/app/transport/enum/transport-type.enum';
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

    @ApiProperty({ description: 'Transport plate no', example: 'QWE 123' })
    @IsString()
    @IsOptional()
    transportPlateNo: string;

    @ApiProperty({
        description: 'Student transport pass code',
        example: 'K201512563BE',
    })
    @IsString()
    @IsOptional()
    transportPassCode: string;

    @ApiProperty({
        description: 'Student transport type',
        enum: TransportType,
        example: TransportType.Car,
    })
    @IsEnum(TransportType)
    @IsOptional()
    transportType: string;

    @ApiProperty({
        description: 'Student transport status',
        enum: TransportStatus,
        example: TransportStatus.Locked,
    })
    @IsEnum(TransportStatus)
    @IsOptional()
    transportStatus: string;

    @ApiProperty({
        description: 'Student code',
        example: '2015125573',
    })
    @IsString()
    @IsOptional()
    studentCode: string;

    @ApiProperty({
        description: 'Student name',
        example: '2015125573',
    })
    @IsString()
    @IsOptional()
    studentFullname: string;

    @ApiProperty({
        description: 'Student course name',
        enum: Course,
        example: Course.Cs230,
    })
    @IsString()
    @IsOptional()
    studentCourse: string;

    @ApiProperty({
        description: 'Student college name',
        enum: College,
        example: College.Delima,
    })
    @IsString()
    @IsOptional()
    studentCollege: string;

    @ApiProperty({
        description: 'Traffic errors',
        example: ['e1', 'e2'],
    })
    @IsString({ each: true })
    @IsOptional()
    trafficErrors: string[];
}
