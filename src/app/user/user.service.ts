import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryParamUserDto } from './dto/query-param-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryFilter } from './query-filter/user.query-filter';
import { UserTypeEntity } from './repository/user-type.entity';
import { UserEntity } from './repository/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UserTypeEntity)
        private readonly userTypeRepository: Repository<UserTypeEntity>,
    ) {}

    async findAll(dto: QueryParamUserDto): Promise<UserEntity[]> {
        if (dto.type) {
            const type = await this.userTypeRepository.findOne({
                code: dto?.type,
            });

            dto = {
                ...dto,
                typeId: type.id,
            } as QueryParamUserDto;
        }

        const queryFilter = new UserQueryFilter(dto);

        return this.userRepository.find(queryFilter.toTypeormQuery());
    }

    async findOne(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne(userId);
    }

    async findOneByCode(code: string): Promise<UserEntity> {
        return this.userRepository.findOne({ code });
    }

    async findAllType(): Promise<UserTypeEntity[]> {
        return this.userTypeRepository.find();
    }

    async create(dto: CreateUserDto): Promise<UserEntity> {
        const type = await this.userTypeRepository.findOne({ code: dto?.type });

        return this.userRepository.save({
            typeId: type?.id,
            code: dto?.code,
            name: dto?.name,
            mobileTelNo: dto?.mobileTelNo,
            officeTelNo: dto?.officeTelNo,
            email: dto?.email,
            firstTimer: true,
            userType: type,
        } as UserEntity);
    }

    async update(user: UserEntity, dto: UpdateUserDto): Promise<UserEntity> {
        const type = await this.userTypeRepository.findOne({ code: dto?.type });

        return this.userRepository.save(
            {
                id: user.id,
                typeId: type?.id ?? user.typeId,
                code: dto?.code ?? user.code,
                name: dto?.name ?? user.name,
                mobileTelNo: dto?.mobileTelNo ?? user.mobileTelNo,
                officeTelNo: dto?.officeTelNo ?? user.officeTelNo,
                firstTimer: dto?.firstTimer ?? user.firstTimer,
                email: dto?.email ?? user.email,
                userType: type ?? user.userType,
            } as UserEntity,
            { reload: true },
        );
    }
}
