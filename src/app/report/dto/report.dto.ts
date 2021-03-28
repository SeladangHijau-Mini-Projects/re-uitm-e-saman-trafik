import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { College } from 'src/app/student/enum/college.enum';
import { Course } from 'src/app/student/enum/course.enum';
import { Faculty } from 'src/app/student/enum/faculty.enum';
import { TransportStatus } from 'src/app/transport/enum/transport-status.enum';
import { TransportType } from 'src/app/transport/enum/transport-type.enum';
import { ReportStatus } from '../enum/report-status.enum';
import { ReportEntity } from '../repository/report.entity';
import { TrafficErrorDto } from './traffic-error.dto';

export class ReportDto {
    @ApiProperty({ description: 'Report ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'Report status',
        example: ReportStatus.New,
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
        description: 'Transport status',
        example: TransportStatus.Locked,
    })
    @IsString()
    transportStatus: string;

    @ApiProperty({
        description: 'Transport type',
        example: TransportType.Car,
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
        description: 'Student course',
        example: Course.Cs230,
    })
    @IsString()
    studentCourse: string;

    @ApiProperty({
        description: 'Student faculty',
        example: Faculty.Fskm,
    })
    @IsString()
    studentFaculty: string;

    @ApiProperty({
        description: 'Student college',
        example: College.Delima,
    })
    @IsString()
    studentCollege: string;

    @ApiProperty({
        description: 'Error list',
        example: [
            {
                name: 'e1',
                description: 'Menghalang laluan',
            },
        ],
    })
    @IsString()
    trafficErrors: TrafficErrorDto[];

    static fromModel(model: ReportEntity): ReportDto {
        return {
            id: model?.id,
            status: model?.reportStatus?.description,
            location: model?.location,
            createdAt: model?.createdAt,
            updatedAt: model?.updatedAt,
            remark: model?.reportHistories
                ? model?.reportHistories.length > 0
                    ? model?.reportHistories[0]?.remark
                    : null
                : null,
            transportStatus:
                model?.reportTransport?.transportStatus?.description,
            transportType: model?.reportTransport?.transportType?.description,
            transportPlateNo: model?.reportTransport?.plateNo,
            transportPassCode: model?.reportTransport?.passCode,
            studentCode: model?.reportStudent?.studentCode,
            studentFullname: model?.reportStudent?.fullname,
            studentCourse: model?.reportStudent?.studentCourse?.description,
            studentFaculty:
                model?.reportStudent?.studentCourse?.courseFaculty?.description,
            studentCollege: model?.reportStudent?.studentCollege?.description,
            trafficErrors: model?.reportReportTrafficErrors
                ? model?.reportReportTrafficErrors?.map(
                      (error: object) =>
                          ({
                              name: error['reportTrafficErrorReport']['name'],
                              description:
                                  error['reportTrafficErrorReport'][
                                      'description'
                                  ],
                          } as TrafficErrorDto),
                  )
                : [],
        } as ReportDto;
    }
}
