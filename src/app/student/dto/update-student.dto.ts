import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { College } from '../enum/college.enum';
import { Course } from '../enum/course.enum';

export class UpdateStudentDto {
    @ApiProperty({
        description: 'Course name',
        enum: Course,
        example: Course.Cs230,
    })
    @IsEnum(Course)
    course: string;

    @ApiProperty({
        description: 'College name',
        enum: College,
        example: College.Delima,
    })
    @IsEnum(College)
    college: string;

    @ApiProperty({
        description: 'Student full name',
        example: 'Muhammad Nadzmi Bin Mohamed Idzham',
    })
    @IsString()
    fullname: string;
}
