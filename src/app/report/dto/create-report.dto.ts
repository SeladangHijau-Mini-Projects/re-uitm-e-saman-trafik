import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { College } from 'src/app/student/enum/college.enum';
import { Course } from 'src/app/student/enum/course.enum';

export class CreateReportDto {
    @ApiProperty({ description: 'Report location', example: 'UiTM' })
    @IsString()
    location: string;

    @ApiProperty({ description: 'Report remark', example: 'Saja je' })
    @IsString()
    remark: string;

    @ApiProperty({ description: 'Car plate no', example: 'QWE 123' })
    @IsString()
    plateNo: string;

    @ApiProperty({
        description: 'Student transport pass code',
        example: 'K201512563BE',
    })
    @IsString()
    @IsOptional()
    passCode: string;

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
    fullname: string;

    @ApiProperty({
        description: 'Student course name',
        enum: Course,
        example: Course.Cs230,
    })
    @IsString()
    @IsOptional()
    course: string;

    @ApiProperty({
        description: 'Student college name',
        enum: College,
        example: College.Delima,
    })
    @IsString()
    @IsOptional()
    college: string;
}
