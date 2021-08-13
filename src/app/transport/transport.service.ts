import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { Repository } from 'typeorm';
import { CreateTransportDto } from './dto/create-transport.dto';
import { TransportQueryParamDto } from './dto/transport-query-param.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { TransportQueryFilter } from './query-filter/transport.query-filter';
import { TransportStatusEntity } from './repository/transport-status.entity';
import { TransportEntity } from './repository/transport.entity';

@Injectable()
export class TransportService {
    constructor(
        @InjectRepository(TransportEntity)
        private readonly transportRepository: Repository<TransportEntity>,
        @InjectRepository(TransportStatusEntity)
        private readonly transportStatusRepository: Repository<
            TransportStatusEntity
        >,
    ) {}

    async findAll(
        param: TransportQueryParamDto = null,
        withDeleted: boolean = false,
    ): Promise<TransportEntity[]> {
        if (!param) {
            return this.transportRepository.find({ withDeleted });
        }

        if (param.status) {
            const status = await this.transportStatusRepository.findOne({
                code: param.status,
            });

            param = {
                ...param,
                statusId: status?.id,
            } as TransportQueryParamDto;
        }

        const query = new TransportQueryFilter(param).toTypeormQuery();
        query.relations = ['transportStudent'];
        query.withDeleted = withDeleted;

        return this.transportRepository.find(query);
    }

    async findOne(transportId: number): Promise<TransportEntity> {
        return this.transportRepository.findOne(transportId);
    }

    async findOneByPlateNo(plateNo: string): Promise<TransportEntity> {
        return this.transportRepository.findOne({ plateNo });
    }

    async findAllStatus(): Promise<TransportStatusEntity[]> {
        return this.transportStatusRepository.find();
    }

    async create(dto: CreateTransportDto): Promise<TransportEntity> {
        const status = await this.transportStatusRepository.findOne({
            code: dto.status,
        });

        return this.transportRepository.save({
            code: dto.passCode,
            plateNo: dto.plateNo,
            status,
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

        const status = await this.transportStatusRepository.findOne({
            code: dto.status,
        });

        return this.transportRepository.save({
            id: existingTransport?.id,
            code: dto.passCode ?? existingTransport?.code,
            status: status ?? existingTransport?.status,
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

        const status = await this.transportStatusRepository.findOne({
            code: dto.status,
        });

        return this.transportRepository.save({
            id: existingTransport?.id,
            code: dto.passCode ?? existingTransport?.code,
            status: status ?? existingTransport?.status,
        } as TransportEntity);
    }
}
