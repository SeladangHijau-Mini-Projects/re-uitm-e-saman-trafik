import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportTrafficErrorEntity } from '../report/repository/report-traffic-error.entity';
import { TrafficErrorEntity } from './repository/traffic-error.entity';

@Injectable()
export class TrafficErrorService {
    constructor(
        @InjectRepository(TrafficErrorEntity)
        private readonly trafficErrorRepository: Repository<TrafficErrorEntity>,
        @InjectRepository(ReportTrafficErrorEntity)
        private readonly reportTrafficErrorRepository: Repository<
            ReportTrafficErrorEntity
        >,
    ) {}

    async createReportTrafficError(
        reportId: number,
        errorNameList: string[],
    ): Promise<TrafficErrorEntity[]> {
        const trafficErrorList = [];

        for await (const name of errorNameList) {
            const trafficError = await this.trafficErrorRepository.findOne({
                name,
            });

            await this.reportTrafficErrorRepository.save({
                reportId,
                trafficError,
            } as ReportTrafficErrorEntity);

            trafficErrorList.push(trafficError);
        }

        return trafficErrorList;
    }
}
