import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { College } from 'src/app/student/enum/college.enum';
import { Course } from 'src/app/student/enum/course.enum';
import { Faculty } from 'src/app/student/enum/faculty.enum';
import { TrafficErrorEntity } from 'src/app/traffic-error/repository/traffic-error.entity';
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
        enum: ReportStatus,
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
        enum: TransportStatus,
        example: TransportStatus.Locked,
    })
    @IsString()
    transportStatus: string;

    @ApiProperty({
        description: 'Transport type',
        enum: TransportType,
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
        enum: Course,
        example: Course.Cs230,
    })
    @IsString()
    studentCourse: string;

    @ApiProperty({
        description: 'Student faculty',
        enum: Faculty,
        example: Faculty.Fskm,
    })
    @IsString()
    studentFaculty: string;

    @ApiProperty({
        description: 'Student college',
        enum: College,
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
            status: model?.status?.name,
            location: model?.location,
            createdAt: model?.createdAt,
            updatedAt: model?.updatedAt,
            remark: model?.histories
                ? model?.histories.length > 0
                    ? model?.histories[0]?.remark
                    : null
                : null,
            transportStatus: model?.transport?.transportStatus?.name,
            transportType: model?.transport?.transportType?.name,
            transportPlateNo: model?.transport?.plateNo,
            transportPassCode: model?.transport?.passCode,
            studentCode: model?.student?.studentCode,
            studentFullname: model?.student?.fullname,
            studentCourse: model?.student?.studentCourse?.name,
            studentFaculty: model?.student?.studentCourse?.courseFaculty?.name,
            studentCollege: model?.student?.studentCollege?.name,
            trafficErrors: model?.trafficErrors
                ? model?.trafficErrors?.map(
                      (error: TrafficErrorEntity) =>
                          ({
                              name: error.name,
                              description: error.description,
                          } as TrafficErrorDto),
                  )
                : [],
        } as ReportDto;
    }
}
