import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
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

    async findAllError(): Promise<TrafficErrorEntity[]> {
        return this.trafficErrorRepository.find();
    }

    async findByNameList(nameList: string[]): Promise<TrafficErrorEntity[]> {
        const trafficErrorList = [];

        for await (const name of nameList) {
            const trafficError = await this.trafficErrorRepository.findOne({
                name,
            });

            if (!trafficError) {
                throw new ResourceNotFoundException(
                    `Traffic Error '${name}' was not found.`,
                );
            }

            trafficErrorList.push(trafficError);
        }

        return trafficErrorList;
    }

    async createAll(
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

    async updateAll(
        reportId: number,
        errorNameList: string[],
    ): Promise<TrafficErrorEntity[]> {
        await this.deleteAllByReportId(reportId);
        return this.createAll(reportId, errorNameList);
    }

    async deleteAllByReportId(reportId: number): Promise<void> {
        await this.reportTrafficErrorRepository.delete({ reportId });
    }
}
