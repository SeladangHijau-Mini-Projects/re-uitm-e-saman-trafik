import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { College } from 'src/app/student/enum/college.enum';
import { Course } from 'src/app/student/enum/course.enum';
import { Faculty } from 'src/app/student/enum/faculty.enum';
import { TransportStatus } from 'src/app/transport/enum/transport-status.enum';
import { TransportType } from 'src/app/transport/enum/transport-type.enum';
import { ReportStatus } from '../enum/report-status.enum';
import { ReportStatusEntity } from '../repository/report-status.entity';
import { ReportEntity } from '../repository/report.entity';

export class ReportDetailDto {
    @ApiProperty({ description: 'Report ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'Report status key',
        example: ReportStatus.New,
        enum: ReportStatus,
    })
    @IsEnum(ReportStatusEntity)
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
        enum: TransportStatus,
    })
    @IsEnum(TransportStatus)
    transportStatus: string;

    @ApiProperty({
        description: 'Transport type key',
        example: TransportType.Car,
        enum: TransportType,
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
        description: 'Student course key',
        example: Course.Cs230,
        enum: Course,
    })
    @IsEnum(Course)
    studentCourse: string;

    @ApiProperty({
        description: 'Student faculty key',
        example: Faculty.Fskm,
        enum: Faculty,
    })
    @IsEnum(Faculty)
    studentFaculty: string;

    @ApiProperty({
        description: 'Student college key',
        example: College.Delima,
        enum: College,
    })
    @IsEnum(College)
    studentCollege: string;

    @ApiProperty({
        description: 'Error list',
        example: ['e1', 'e2'],
    })
    @IsString()
    trafficErrors: string[];

    static fromModel(model: ReportEntity): ReportDetailDto {
        return {
            id: model?.id,
            status: model?.status?.code,
            location: model?.location,
            createdAt: model?.createdAt,
            updatedAt: model?.updatedAt,
            remark: null,
            transportStatus: model?.transport?.status?.code,
            transportPlateNo: model?.transport?.plateNo,
            transportCode: model?.transport?.code,
            studentCode: model?.student?.code,
            studentName: model?.student?.name,
            trafficErrors: model?.reportTrafficErrors
                ? model?.reportTrafficErrors?.map(
                      (error: object) => error['reportTrafficErrors']['name'],
                  )
                : [],
        } as ReportDetailDto;
    }
}
