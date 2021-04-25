import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LookupDto {
    @ApiProperty({ description: 'Lookup label', example: 'Error 1' })
    @IsString()
    @IsNotEmpty()
    label: string;

    @ApiProperty({ description: 'Lookup value', example: 'e1' })
    @IsString()
    @IsNotEmpty()
    value: string;
}
