import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto {
    @ApiProperty({
        description: 'Student code',
        example: '2015125573',
    })
    @IsString()
    @IsOptional()
    code: string;

    @ApiProperty({
        description: 'Student full name',
        example: 'Muhammad Nadzmi Bin Mohamed Idzham',
    })
    @IsString()
    @IsOptional()
    name: string;
}
