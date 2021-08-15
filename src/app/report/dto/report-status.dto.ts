import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ReportStatus } from '../enum/report-status.enum';
import { ReportStatusEntity } from '../repository/report-status.entity';

export class ReportStatusDto {
    @ApiProperty({ description: 'Report Status Id', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'Report status code',
        example: ReportStatus.New,
        enum: ReportStatus,
    })
    @IsEnum(ReportStatus)
    code: ReportStatus;

    @ApiProperty({ description: 'Report Status description', example: 'New' })
    @IsString()
    description: string;

    static fromModel(model: ReportStatusEntity): ReportStatusDto {
        return {
            id: model?.id,
            code: model?.code,
            description: model?.description,
        } as ReportStatusDto;
    }
}
