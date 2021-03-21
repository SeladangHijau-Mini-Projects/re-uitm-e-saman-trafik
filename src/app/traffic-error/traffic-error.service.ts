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

    async findByNameList(nameList: string[]): Promise<TrafficErrorEntity[]> {
        const trafficErrorList = [];

        for await (const name of nameList) {
            trafficErrorList.push(
                await this.trafficErrorRepository.findOne({
                    name,
                }),
            );
        }

        return trafficErrorList;
    }

    async create(
        reportId: number,
        errorNameList: string[],
    ): Promise<TrafficErrorEntity[]> {
        const trafficErrorList = await this.findByNameList(errorNameList);

        for await (const trafficError of trafficErrorList) {
            await this.reportTrafficErrorRepository.save({
                reportId,
                trafficErrorId: trafficError.id,
            } as ReportTrafficErrorEntity);
        }

        return trafficErrorList;
    }
}
