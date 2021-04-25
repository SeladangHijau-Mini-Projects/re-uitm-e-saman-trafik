import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { StudentEntity } from '../repository/student.entity';

export class StudentSummaryDto {
    @ApiProperty({ description: 'Student ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'Course name value',
        example: 'Ijazah Sarjana Muda Sains Komputer Dan Matematik',
    })
    @IsString()
    course: string;

    @ApiProperty({
        description: 'College name value',
        example: 'Delima',
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

    static fromModel(model: StudentEntity): StudentSummaryDto {
        return {
            id: model?.id,
            course: model?.studentCourse?.description,
            college: model?.studentCollege?.description,
            studentCode: model?.studentCode,
            fullname: model?.fullname,
        } as StudentSummaryDto;
    }
}
