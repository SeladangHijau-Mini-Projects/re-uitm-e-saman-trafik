import { Injectable } from '@nestjs/common';
import { ReportService } from '../report/report.service';
import { ReportStatusEntity } from '../report/repository/report-status.entity';
import { TrafficErrorEntity } from '../traffic-error/repository/traffic-error.entity';
import { TrafficErrorService } from '../traffic-error/traffic-error.service';
import { TransportStatusEntity } from '../transport/repository/transport-status.entity';
import { TransportService } from '../transport/transport.service';
import { UserTypeEntity } from '../user/repository/user-type.entity';
import { UserService } from '../user/user.service';
import { LookupListDto } from './dto/lookup-list.dto';
import { LookupDto } from './dto/lookup.dto';
import { LookupCode } from './enum/lookup-code.enum';

@Injectable()
export class Lookupservice {
    constructor(
        private readonly userService: UserService,
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
            case LookupCode.UserType:
                return (await this.userService.findAllType()).map(
                    (type: UserTypeEntity) =>
                        ({
                            label: type.description,
                            value: type.code,
                        } as LookupDto),
                );
            case LookupCode.TransportStatus:
                return (await this.transportService.findAllStatus()).map(
                    (status: TransportStatusEntity) =>
                        ({
                            label: status.description,
                            value: status.code,
                        } as LookupDto),
                );
            case LookupCode.ReportStatus:
                return (await this.reportService.findAllStatus()).map(
                    (status: ReportStatusEntity) =>
                        ({
                            label: status.description,
                            value: status.code,
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
