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
        description: 'Transport ID',
        example: 1,
    })
    @IsNumber()
    transportId: number;

    @ApiProperty({
        description: 'Transport status value',
        example: 'Locked',
    })
    @IsString()
    transportStatus: string;

    @ApiProperty({
        description: 'Transport type value',
        example: 'Car',
    })
    @IsString()
    transportType: string;

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
    transportPassCode: string;

    @ApiProperty({
        description: 'Student ID',
        example: 1,
    })
    @IsNumber()
    studentId: number;

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
    studentFullname: string;

    @ApiProperty({
        description: 'Student course value',
        example: 'Ijazah Sarjana Muda Sains Komputer Dan Matematik',
    })
    @IsString()
    studentCourse: string;

    @ApiProperty({
        description: 'Student faculty value',
        example: 'Fakulti Sains Komputer Dan Matematik',
    })
    @IsString()
    studentFaculty: string;

    @ApiProperty({
        description: 'Student college value',
        example: 'Delima',
    })
    @IsString()
    studentCollege: string;

    @ApiProperty({
        description: 'Error list',
        example: ['Menghalang laluan'],
    })
    @IsString()
    trafficErrors: string[];

    static fromModel(model: ReportEntity): ReportSummaryDto {
        return {
            id: model?.id,
            status: model?.reportStatus?.description,
            location: model?.location,
            createdAt: model?.createdAt,
            updatedAt: model?.updatedAt,
            remark:
                model?.reportHistories && model?.reportHistories.length > 0
                    ? model?.reportHistories[model?.reportHistories.length - 1]
                          ?.remark
                    : null,
            transportId: model?.reportTransport?.id,
            transportStatus:
                model?.reportTransport?.transportStatus?.description,
            transportType: model?.reportTransport?.transportType?.description,
            transportPlateNo: model?.reportTransport?.plateNo,
            transportPassCode: model?.reportTransport?.passCode,
            studentId: model?.reportStudent?.id,
            studentCode: model?.reportStudent?.studentCode,
            studentFullname: model?.reportStudent?.fullname,
            studentCourse: model?.reportStudent?.studentCourse?.description,
            studentFaculty:
                model?.reportStudent?.studentCourse?.courseFaculty?.description,
            studentCollege: model?.reportStudent?.studentCollege?.description,
            trafficErrors: model?.reportReportTrafficErrors
                ? model?.reportReportTrafficErrors?.map(
                      (error: object) =>
                          error['reportTrafficErrorTrafficError'][
                              'description'
                          ],
                  )
                : [],
        } as ReportSummaryDto;
    }
}
