import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export abstract class BaseQueryParamDTO {
    @ApiProperty()
    @IsOptional()
    id: string;

    @ApiProperty()
    @IsOptional()
    page: number = 1;

    @ApiProperty()
    @IsOptional()
    limit: number = 30;

    @ApiProperty()
    @IsOptional()
    orderBy: string = '-id';

    @ApiProperty()
    @IsOptional()
    fields: string;

    @ApiProperty()
    @IsOptional()
    from: string;

    @ApiProperty()
    @IsOptional()
    to: string;

    @ApiProperty()
    @IsOptional()
    paginationMeta: string;
}
