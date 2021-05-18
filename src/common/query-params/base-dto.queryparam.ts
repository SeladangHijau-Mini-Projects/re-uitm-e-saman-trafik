import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

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
    @IsDate()
    @IsOptional()
    from: Date;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    to: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    paginationMeta: string;
}
