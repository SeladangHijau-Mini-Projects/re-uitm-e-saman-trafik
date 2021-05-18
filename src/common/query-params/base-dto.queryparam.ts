import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export abstract class BaseQueryParamDTO {
    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    id: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    page: number = 1;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    limit: number = 30;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    orderBy: string = '-id';

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    fields: string;

    @ApiProperty({ required: false })
    @IsDate()
    @IsOptional()
    from: Date;

    @ApiProperty({ required: false })
    @IsDate()
    @IsOptional()
    to: Date;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    paginationMeta: string;
}
