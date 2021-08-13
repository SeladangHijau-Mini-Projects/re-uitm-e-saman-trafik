import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { StudentEntity } from '../repository/student.entity';

export class StudentSummaryDto {
    @ApiProperty({ description: 'Student ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'Student code',
        example: '2015125573',
    })
    @IsString()
    code: string;

    @ApiProperty({
        description: 'Student full name',
        example: 'Muhammad Nadzmi Bin Mohamed Idzham',
    })
    @IsString()
    name: string;

    static fromModel(model: StudentEntity): StudentSummaryDto {
        return {
            id: model?.id,
            code: model?.code,
            name: model?.name,
        } as StudentSummaryDto;
    }
}
