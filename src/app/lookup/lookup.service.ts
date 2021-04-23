import { Injectable } from '@nestjs/common';
import { ReportService } from '../report/report.service';
import { ReportStatusEntity } from '../report/repository/report-status.entity';
import { CollegeEntity } from '../student/repository/college.entity';
import { CourseEntity } from '../student/repository/course.entity';
import { FacultyEntity } from '../student/repository/faculty.entity';
import { StudentService } from '../student/student.service';
import { TrafficErrorEntity } from '../traffic-error/repository/traffic-error.entity';
import { TrafficErrorService } from '../traffic-error/traffic-error.service';
import { TransportStatusEntity } from '../transport/repository/transport-status.entity';
import { TransportTypeEntity } from '../transport/repository/transport-type.entity';
import { TransportService } from '../transport/transport.service';
import { UserRankEntity } from '../user/repository/user-rank.entity';
import { UserTypeEntity } from '../user/repository/user-type.entity';
import { UserService } from '../user/user.service';
import { LookupListDto } from './dto/lookup-list.dto';
import { LookupDto } from './dto/lookup.dto';
import { LookupCode } from './enum/lookup-code.enum';

@Injectable()
export class Lookupservice {
    constructor(
        private readonly userService: UserService,
        private readonly studentService: StudentService,
        private readonly transportService: TransportService,
        private readonly reportService: ReportService,
        private readonly trafficErrorService: TrafficErrorService,
    ) {}

    async findAllByCodeList(codeList: string[]): Promise<LookupListDto> {
        const lookupList = {};

        for (const code of codeList) {
            const lookupObj = await this.findAllByCode(code);

            if (lookupObj) {
                lookupList[code] = await this.findAllByCode(code);
            }
        }

        return lookupList;
    }

    async findAllByCode(code: string): Promise<LookupDto[]> {
        switch (code) {
            case LookupCode.College:
                return (await this.studentService.findAllCollege()).map(
                    (college: CollegeEntity) =>
                        ({
                            label: college.description,
                            value: college.name,
                        } as LookupDto),
                );
            case LookupCode.Course:
                return (await this.studentService.findAllCourse()).map(
                    (course: CourseEntity) =>
                        ({
                            label: course.description,
                            value: course.name,
                        } as LookupDto),
                );
            case LookupCode.Faculty:
                return (await this.studentService.findAllFaculty()).map(
                    (faculty: FacultyEntity) =>
                        ({
                            label: faculty.description,
                            value: faculty.name,
                        } as LookupDto),
                );
            case LookupCode.UserRank:
                return (await this.userService.findAllRank()).map(
                    (rank: UserRankEntity) =>
                        ({
                            label: rank.description,
                            value: rank.name,
                        } as LookupDto),
                );
            case LookupCode.UserType:
                return (await this.userService.findAllType()).map(
                    (type: UserTypeEntity) =>
                        ({
                            label: type.description,
                            value: type.name,
                        } as LookupDto),
                );
            case LookupCode.TransportStatus:
                return (await this.transportService.findAllStatus()).map(
                    (status: TransportStatusEntity) =>
                        ({
                            label: status.description,
                            value: status.name,
                        } as LookupDto),
                );
            case LookupCode.TransportType:
                return (await this.transportService.findAllType()).map(
                    (type: TransportTypeEntity) =>
                        ({
                            label: type.description,
                            value: type.name,
                        } as LookupDto),
                );
            case LookupCode.ReportStatus:
                return (await this.reportService.findAllStatus()).map(
                    (status: ReportStatusEntity) =>
                        ({
                            label: status.description,
                            value: status.name,
                        } as LookupDto),
                );
            case LookupCode.TrafficError:
                return (await this.trafficErrorService.findAllError()).map(
                    (error: TrafficErrorEntity) =>
                        ({
                            label: error.description,
                            value: error.name,
                        } as LookupDto),
                );
            default:
                return null;
        }
    }
}
