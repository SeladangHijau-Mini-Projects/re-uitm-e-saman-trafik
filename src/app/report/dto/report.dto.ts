import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { College } from 'src/app/student/enum/college.enum';
import { Course } from 'src/app/student/enum/course.enum';
import { Faculty } from 'src/app/student/enum/faculty.enum';
import { TransportStatus } from 'src/app/transport/enum/transport-status.enum';
import { TransportType } from 'src/app/transport/enum/transport-type.enum';
import { ReportStatus } from '../enum/report-status.enum';
import { ReportTrafficErrorEntity } from '../repository/report-traffic-error.entity';
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
    @IsString()
    createdAt: Date;

    @ApiProperty({
        description: 'Report updated at date',
        example: '2020-12-23 09:00:00',
    })
    @IsString()
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
            remark:
                model?.histories.length > 0
                    ? model?.histories[0]?.remark
                    : null,
            transportStatus: model?.transport?.status?.name,
            transportType: model?.transport?.type?.name,
            transportPlateNo: model?.transport?.plateNo,
            transportPassCode: model?.transport?.passCode,
            studentCode: model?.student?.studentCode,
            studentFullname: model?.student?.fullname,
            studentCourse: model?.student?.course?.name,
            studentFaculty: model?.student?.course?.faculty?.name,
            studentCollege: model?.student?.college?.name,
            trafficErrors: model?.reportTrafficErrors?.map(
                (error: ReportTrafficErrorEntity) =>
                    ({
                        name: error?.trafficError?.name,
                        description: error?.trafficError?.description,
                    } as TrafficErrorDto),
            ),
        } as ReportDto;
    }
}
