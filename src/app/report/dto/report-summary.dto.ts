import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ReportEntity } from '../repository/report.entity';

export class ReportSummaryDto {
    @ApiProperty({ description: 'Report ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'Report status value',
        example: 'New',
    })
    @IsString()
    status: string;

    @ApiProperty({ description: 'Report location', example: 'UiTM' })
    @IsString()
    location: string;

    @ApiProperty({
        description: 'Report created at date',
        example: '2020-12-10 09:00:00',
    })
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        description: 'Report updated at date',
        example: '2020-12-23 09:00:00',
    })
    @IsDate()
    updatedAt: Date;

    @ApiProperty({
        description: 'Report latest remark',
        example: 'Some remark',
    })
    @IsString()
    remark: string;

    @ApiProperty({
        description: 'Transport status value',
        example: 'Locked',
    })
    @IsString()
    transportStatus: string;

    @ApiProperty({
        description: 'Transport plate no',
        example: 'QWE 123',
    })
    @IsString()
    transportPlateNo: string;

    @ApiProperty({
        description: 'Student transport pass code',
        example: 'K201512563BE',
    })
    @IsString()
    transportCode: string;

    @ApiProperty({
        description: 'Student code',
        example: '205125573',
    })
    @IsString()
    studentCode: string;

    @ApiProperty({
        description: 'Student full name',
        example: 'Muhammad Nadzmi Bin Mohamed Idzham',
    })
    @IsString()
    studentName: string;

    @ApiProperty({
        description: 'Error list',
        example: ['Menghalang laluan'],
    })
    @IsString()
    trafficErrors: string[];

    static fromModel(model: ReportEntity): ReportSummaryDto {
        return {
            id: model?.id,
            status: model?.status?.description,
            location: model?.location,
            createdAt: model?.createdAt,
            updatedAt: model?.updatedAt,
            remark: null,
            transportStatus: model?.transport?.status?.description,
            transportPlateNo: model?.transport?.plateNo,
            transportCode: model?.transport?.code,
            studentCode: model?.student?.code,
            studentName: model?.student?.name,
            trafficErrors: model?.reportTrafficErrors
                ? model?.reportTrafficErrors?.map(
                      (error: object) =>
                          error['reportTrafficErrors']['description'],
                  )
                : [],
        } as ReportSummaryDto;
    }
}
