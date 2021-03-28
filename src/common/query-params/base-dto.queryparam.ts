import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export abstract class BaseQueryParamDTO {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    page: number = 1;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    limit: number = 30;

    @ApiProperty()
    @IsString()
    @IsOptional()
    orderBy: string = '-id';

    @ApiProperty()
    @IsString()
    @IsOptional()
    fields: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    from: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    to: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    paginationMeta: string;
}
