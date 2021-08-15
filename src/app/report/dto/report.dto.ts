import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import { StudentDto } from 'src/app/student/dto/student.dto';
import { TrafficErrorDto } from 'src/app/traffic-error/dto/traffic-error.dto';
import { TransportDto } from 'src/app/transport/dto/transport.dto';
import { ReportTrafficErrorEntity } from '../repository/report-traffic-error.entity';
import { ReportEntity } from '../repository/report.entity';
import { ReportStatusDto } from './report-status.dto';

export class ReportDto {
    @ApiProperty({ description: 'Report ID', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'Report status',
    })
    @IsObject()
    status: ReportStatusDto;

    @ApiProperty({ description: 'Report location', example: 'UiTM' })
    @IsString()
    location: string;

    @ApiProperty({ description: 'Transport detail' })
    @IsObject()
    transport: TransportDto;

    @ApiProperty({ description: 'Student detail' })
    @IsObject()
    student: StudentDto;

    @ApiProperty({
        description: 'Traffic Error list',
    })
    @IsString()
    trafficErrors: TrafficErrorDto[];

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

    static fromModel(model: ReportEntity): ReportDto {
        return {
            id: model?.id,
            status: model?.status
                ? ReportStatusDto.fromModel(model?.status)
                : null,
            location: model?.location,
            transport: model?.transport
                ? TransportDto.fromModel(model?.transport)
                : null,
            student: model?.student
                ? StudentDto.fromModel(model?.student)
                : null,
            trafficErrors: model?.reportTrafficErrors
                ? model?.reportTrafficErrors?.map(
                      (value: ReportTrafficErrorEntity) =>
                          TrafficErrorDto.fromModel(value?.trafficError),
                  )
                : [],
            createdAt: model?.createdAt,
            updatedAt: model?.updatedAt,
        } as ReportDto;
    }
}
