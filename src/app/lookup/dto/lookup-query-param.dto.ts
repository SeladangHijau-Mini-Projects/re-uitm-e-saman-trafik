import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { LookupCode } from '../enum/lookup-code.enum';

export class LookupQueryParamDto {
    @ApiProperty({
        description: 'Lookup code',
        example: LookupCode.College,
        enum: LookupCode,
    })
    @IsEnum(LookupCode)
    @IsNotEmpty()
    code: string;
}
