import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { LookupCode } from '../enum/lookup-code.enum';

export class LookupListQueryParamDto {
    @ApiProperty({
        description: 'Lookup code list',
        example: [LookupCode.College],
        enum: [LookupCode],
    })
    @IsEnum(LookupCode, { each: true })
    @IsNotEmpty()
    codeList: string[];
}
