import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransportDto } from './dto/create-transport.dto';
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

    async findOneByPlateNo(plateNo: string): Promise<TransportEntity> {
        return this.transportRepository.findOne({ plateNo });
    }

    async create(dto: CreateTransportDto): Promise<TransportEntity> {
        const type = await this.transportTypeRepository.findOne({
            name: dto.type,
        });
        const status = await this.transportStatusRepository.findOne({
            name: dto.status,
        });

        return this.transportRepository.save({
            plateNo: dto.plateNo,
            passCode: dto.passCode,
            studentId: dto.studentId,
            transportType: type,
            transportStatus: status,
        } as TransportEntity);
    }
}
