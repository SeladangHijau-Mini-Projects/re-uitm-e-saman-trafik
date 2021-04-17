import { Expose } from 'class-transformer';
import { UserEntity } from 'src/app/user/repository/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';

@Entity('auths')
export class AuthEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ name: 'user_id' })
    @Expose()
    userId: number;

    @Column({ name: 'password' })
    @Expose()
    password: string;

    @Column({ name: 'reset_token' })
    @Expose()
    resetToken: string;

    @Column({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;

    @OneToOne(() => UserEntity, { eager: true })
    @JoinColumn({ name: 'user_id' })
    authUser: UserEntity;
}
