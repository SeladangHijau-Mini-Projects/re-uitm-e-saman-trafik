import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportStatusEntity } from './repository/transport-status.entity';
import { TransportTypeEntity } from './repository/transport-type.entity';
import { TransportEntity } from './repository/transport.entity';

@Injectable()
export class TransportService {
    constructor(
        @InjectRepository(TransportEntity)
        private readonly transportRepository: Repository<TransportEntity>,
        @InjectRepository(TransportTypeEntity)
        private readonly transportTypeRepository: Repository<
            TransportTypeEntity
        >,
        @InjectRepository(TransportStatusEntity)
        private readonly transportStatusRepository: Repository<
            TransportStatusEntity
        >,
    ) {}
}
