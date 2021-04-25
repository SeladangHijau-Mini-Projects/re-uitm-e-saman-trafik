import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { College } from '../enum/college.enum';
import { Course } from '../enum/course.enum';
import { StudentEntity } from '../repository/student.entity';

export class StudentDetailDto {
    @ApiProperty({ description: 'Student ID', example: 1 })
    @IsNumber()
    id: number;

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

    static fromModel(model: StudentEntity): StudentDetailDto {
        return {
            id: model?.id,
            course: model?.studentCourse?.name,
            college: model?.studentCollege?.name,
            studentCode: model?.studentCode,
            fullname: model?.fullname,
        } as StudentDetailDto;
    }
}
