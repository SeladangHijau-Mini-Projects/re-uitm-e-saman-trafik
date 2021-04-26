import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { Repository } from 'typeorm';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
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

    async findOne(transportId: number): Promise<TransportEntity> {
        return this.transportRepository.findOne(transportId);
    }

    async findOneByPlateNo(plateNo: string): Promise<TransportEntity> {
        return this.transportRepository.findOne({ plateNo });
    }

    async findAllStatus(): Promise<TransportStatusEntity[]> {
        return this.transportStatusRepository.find();
    }

    async findAllType(): Promise<TransportTypeEntity[]> {
        return this.transportTypeRepository.find();
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

    async update(
        transportId: number,
        dto: UpdateTransportDto,
        isAllowCreate: boolean = true,
    ): Promise<TransportEntity> {
        // if transport not exist, create new transport
        const existingTransport = await this.findOne(transportId);
        if (!existingTransport) {
            if (isAllowCreate) {
                return this.create({
                    plateNo: dto.plateNo,
                    passCode: dto.passCode,
                    studentId: dto.studentId,
                    type: dto.type,
                    status: dto.status,
                } as CreateTransportDto);
            } else {
                throw new ResourceNotFoundException(
                    `Transport id (${transportId}) not found.`,
                );
            }
        }

        const type = await this.transportTypeRepository.findOne({
            name: dto.type,
        });
        const status = await this.transportStatusRepository.findOne({
            name: dto.status,
        });

        return this.transportRepository.save({
            id: existingTransport?.id,
            passCode: dto.passCode ?? existingTransport?.passCode,
            studentId: dto.studentId ?? existingTransport?.studentId,
            transportType: type ?? existingTransport?.transportType,
            transportStatus: status ?? existingTransport?.transportStatus,
        } as TransportEntity);
    }

    async updateByPlateNo(
        plateNo: string,
        dto: UpdateTransportDto,
        isAllowCreate: boolean = true,
    ): Promise<TransportEntity> {
        // if transport not exist, create new transport
        const existingTransport = await this.findOneByPlateNo(plateNo);
        if (!existingTransport) {
            if (isAllowCreate) {
                return this.create({
                    plateNo,
                    passCode: dto.passCode,
                    studentId: dto.studentId,
                    type: dto.type,
                    status: dto.status,
                } as CreateTransportDto);
            } else {
                throw new ResourceNotFoundException(
                    `Transport plate no (${plateNo}) not found.`,
                );
            }
        }

        const type = await this.transportTypeRepository.findOne({
            name: dto.type,
        });
        const status = await this.transportStatusRepository.findOne({
            name: dto.status,
        });

        return this.transportRepository.save({
            id: existingTransport?.id,
            passCode: dto.passCode ?? existingTransport?.passCode,
            studentId: dto.studentId ?? existingTransport?.studentId,
            transportType: type ?? existingTransport?.transportType,
            transportStatus: status ?? existingTransport?.transportStatus,
        } as TransportEntity);
    }
}
