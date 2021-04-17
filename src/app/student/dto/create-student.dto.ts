import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { College } from '../enum/college.enum';
import { Course } from '../enum/course.enum';

export class CreateStudentDto {
    @ApiProperty({
        description: 'Course name',
        enum: Course,
        example: Course.Cs230,
    })
    @IsString()
    course: string;

    @ApiProperty({
        description: 'College name',
        enum: College,
        example: College.Delima,
    })
    @IsString()
    college: string;

    @ApiProperty({
        description: 'Student code',
        example: '2015125573',
    })
    @IsString()
    studentCode: string;

    @ApiProperty({
        description: 'Student full name',
        example: 'Muhammad Nadzmi Bin Mohamed Idzham',
    })
    @IsString()
    fullname: string;
}
