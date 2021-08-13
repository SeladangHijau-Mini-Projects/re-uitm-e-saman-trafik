import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { BaseQueryParamDTO } from 'src/common/query-params/base-dto.queryparam';
import { LookupCode } from '../enum/lookup-code.enum';

export class LookupQueryParamDto extends BaseQueryParamDTO {
    @ApiProperty({
        description: 'Lookup code',
        example: LookupCode.College,
        enum: LookupCode,
    })
    @IsEnum(LookupCode)
    @IsNotEmpty()
    code: string;
}
