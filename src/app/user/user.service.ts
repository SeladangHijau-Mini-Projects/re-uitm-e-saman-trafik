import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRankEntity } from './repository/user-rank.entity';
import { UserTypeEntity } from './repository/user-type.entity';
import { UserEntity } from './repository/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UserTypeEntity)
        private readonly userTypeRepository: Repository<UserTypeEntity>,
        @InjectRepository(UserRankEntity)
        private readonly userRankRepository: Repository<UserRankEntity>,
    ) {}

    async findOne(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne(userId);
    }

    async findOneByUserCode(userCode: string): Promise<UserEntity> {
        return this.userRepository.findOne({ userCode });
    }

    async create(dto: CreateUserDto): Promise<UserEntity> {
        const rank = await this.userRankRepository.findOne({ name: dto.rank });
        const type = await this.userTypeRepository.findOne({ name: dto.type });

        const newUser = await this.userRepository.save({
            rankId: rank.id,
            typeId: type.id,
            userCode: dto.userCode,
            fullname: dto.fullname,
            phoneTelNo: dto.phoneTelNo,
            officeTelNo: dto.officeTelNo,
            firstTimer: true,
        } as UserEntity);

        return this.userRepository.findOne(newUser.id);
    }

    async update(user: UserEntity, dto: UpdateUserDto): Promise<UserEntity> {
        let rank = null;
        let type = null;

        if (dto.rank) {
            rank = await this.userRankRepository.findOne({ name: dto.rank });
        }
        if (dto.type) {
            type = await this.userRankRepository.findOne({ name: dto.type });
        }

        await this.userRepository.save(
            {
                id: user.id,
                rankId: rank?.id ?? user.rankId,
                typeId: type?.id ?? user.typeId,
                userCode: dto?.userCode ?? user.userCode,
                fullname: dto?.fullname ?? user.fullname,
                phoneTelNo: dto?.phoneTelNo ?? user.phoneTelNo,
                officeTelNo: dto?.officeTelNo ?? user.officeTelNo,
                firstTimer: dto?.firstTimer ?? user.firstTimer,
            } as UserEntity,
            { reload: true },
        );

        return this.userRepository.findOne(user.id);
    }
}
