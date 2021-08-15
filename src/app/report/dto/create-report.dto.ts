import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TransportStatus } from 'src/app/transport/enum/transport-status.enum';
import { ReportStatus } from '../enum/report-status.enum';

export class CreateReportDto {
    @ApiProperty({
        name: 'Report Status',
        enum: ReportStatus,
        example: ReportStatus.New,
    })
    @IsOptional()
    @IsEnum(ReportStatus)
    status: ReportStatus = ReportStatus.New;

    @ApiProperty({
        name: 'Location',
        example: 'UiTM',
    })
    @IsString()
    location: string;

    @ApiProperty({
        name: 'Transport Plate No',
        example: 'QWE 123',
    })
    @IsString()
    transportPlateNo: string;

    @ApiProperty({
        name: 'Transport pass code',
        example: 'QWE 123',
    })
    @IsOptional()
    @IsString()
    transportCode: string;

    @ApiProperty({
        name: 'Transport Status',
        example: TransportStatus.Hold,
    })
    @IsOptional()
    @IsEnum(TransportStatus)
    transportStatus: TransportStatus = TransportStatus.Hold;

    @ApiProperty({
        name: 'Student code',
        example: '2015125573',
    })
    @IsString()
    @IsOptional()
    studentCode: string;

    @ApiProperty({
        name: 'Student name',
        example: 'Muhammad Nadzmi Bin Mohamed Idzham',
    })
    @IsString()
    @IsOptional()
    studentName: string;

    @ApiProperty({ name: 'Traffic error name' })
    @IsString({ each: true })
    trafficErrors: string[];
}
