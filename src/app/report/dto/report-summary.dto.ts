import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { College } from 'src/app/student/enum/college.enum';
import { Course } from 'src/app/student/enum/course.enum';
import { Faculty } from 'src/app/student/enum/faculty.enum';
import { TransportStatus } from 'src/app/transport/enum/transport-status.enum';
import { TransportType } from 'src/app/transport/enum/transport-type.enum';
import { ReportStatus } from '../enum/report-status.enum';
import { ReportEntity } from '../repository/report.entity';

export class ReportSummaryDto {
    @ApiProperty({ description: 'Report ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'Report status key',
        example: ReportStatus.New,
    })
    @IsEnum(ReportStatus)
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
        description: 'Transport status key',
        example: TransportStatus.Locked,
    })
    @IsEnum(TransportStatus)
    transportStatus: string;

    @ApiProperty({
        description: 'Transport type key',
        example: TransportType.Car,
    })
    @IsEnum(TransportType)
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
        description: 'Student course key',
        example: Course.Cs230,
    })
    @IsEnum(Course)
    studentCourse: string;

    @ApiProperty({
        description: 'Student faculty key',
        example: Faculty.Fskm,
    })
    @IsEnum(Faculty)
    studentFaculty: string;

    @ApiProperty({
        description: 'Student college key',
        example: College.Delima,
    })
    @IsString()
    studentCollege: string;

    @ApiProperty({
        description: 'Error list',
        example: ['e1', 'e2'],
    })
    @IsString({ each: true })
    trafficErrors: string[];

    static fromModel(model: ReportEntity): ReportSummaryDto {
        return {
            id: model?.id,
            status: model?.reportStatus?.name,
            location: model?.location,
            createdAt: model?.createdAt,
            updatedAt: model?.updatedAt,
            remark:
                model?.reportHistories && model?.reportHistories.length > 0
                    ? model?.reportHistories[model?.reportHistories.length - 1]
                          ?.remark
                    : null,
            transportStatus: model?.reportTransport?.transportStatus?.name,
            transportType: model?.reportTransport?.transportType?.name,
            transportPlateNo: model?.reportTransport?.plateNo,
            transportPassCode: model?.reportTransport?.passCode,
            studentCode: model?.reportStudent?.studentCode,
            studentFullname: model?.reportStudent?.fullname,
            studentCourse: model?.reportStudent?.studentCourse?.name,
            studentFaculty:
                model?.reportStudent?.studentCourse?.courseFaculty?.name,
            studentCollege: model?.reportStudent?.studentCollege?.name,
            trafficErrors: model?.reportReportTrafficErrors
                ? model?.reportReportTrafficErrors?.map(
                      (error: object) =>
                          error['reportTrafficErrorTrafficError']['name'],
                  )
                : [],
        } as ReportSummaryDto;
    }
}
