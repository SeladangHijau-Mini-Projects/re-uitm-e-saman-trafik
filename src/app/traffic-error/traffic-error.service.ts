import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrafficErrorEntity } from './repository/traffic-error.entity';

@Injectable()
export class TrafficErrorService {
    constructor(
        @InjectRepository(TrafficErrorEntity)
        private readonly trafficErrorRepository: Repository<TrafficErrorEntity>,
    ) {}
}
