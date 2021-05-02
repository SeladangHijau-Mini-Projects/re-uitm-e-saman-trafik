import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { College } from '../enum/college.enum';
import { Course } from '../enum/course.enum';

export class UpdateStudentDto {
    @ApiProperty({
        description: 'Student code',
        example: '2015125573',
    })
    @IsString()
    @IsOptional()
    studentCode: string;

    @ApiProperty({
        description: 'Course name',
        enum: Course,
        example: Course.Cs230,
    })
    @IsEnum(Course)
    @IsOptional()
    course: string;

    @ApiProperty({
        description: 'College name',
        enum: College,
        example: College.Delima,
    })
    @IsEnum(College)
    @IsOptional()
    college: string;

    @ApiProperty({
        description: 'Student full name',
        example: 'Muhammad Nadzmi Bin Mohamed Idzham',
    })
    @IsString()
    @IsOptional()
    fullname: string;
}
