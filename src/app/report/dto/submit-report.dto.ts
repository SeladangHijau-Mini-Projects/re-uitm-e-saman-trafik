import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { College } from 'src/app/student/enum/college.enum';
import { Course } from 'src/app/student/enum/course.enum';
import { TransportStatus } from 'src/app/transport/enum/transport-status.enum';
import { TransportType } from 'src/app/transport/enum/transport-type.enum';
import { ReportStatus } from '../enum/report-status.enum';

export class SubmitReportDto {
    @ApiProperty({ description: 'User ID', example: 1 })
    @IsNumber()
    userId: number;

    @ApiProperty({ description: 'Report location', example: 'UiTM' })
    @IsString()
    location: string;

    @ApiProperty({ description: 'Report remark', example: 'Saja je' })
    @IsString()
    remark: string;

    @ApiProperty({
        description: 'Report status',
        enum: ReportStatus,
        example: ReportStatus.New,
    })
    @IsEnum(ReportStatus)
    @IsOptional()
    status: string = ReportStatus.New;

    @ApiProperty({ description: 'Car plate no', example: 'QWE 123' })
    @IsString()
    transportPlateNo: string;

    @ApiProperty({
        description: 'Student transport pass code',
        example: 'K201512563BE',
    })
    @IsString()
    @IsOptional()
    transportPassCode: string;

    @ApiProperty({
        description: 'Student transport pass code',
        enum: TransportType,
        example: TransportType.Car,
    })
    @IsEnum(TransportType)
    transportType: string;

    @ApiProperty({
        description: 'Student transport status',
        enum: TransportStatus,
        example: TransportStatus.Na,
    })
    @IsEnum(TransportStatus)
    @IsOptional()
    transportStatus: string = TransportStatus.Na;

    @ApiProperty({
        description: 'Traffic errors',
        example: ['e1', 'e2'],
    })
    @IsString({ each: true })
    trafficErrors: string[];

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
}
