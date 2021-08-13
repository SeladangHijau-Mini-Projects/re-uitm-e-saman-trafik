import { Expose } from 'class-transformer';
import { ReportEntity } from 'src/app/report/repository/report.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypeEntity } from './user-type.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    @Expose()
    id: number;

    @Column({ name: 'type_id' })
    @Expose()
    typeId: number;

    @Column({ name: 'code' })
    @Expose()
    code: string;

    @Column({ name: 'name' })
    @Expose()
    name: string;

    @Column({ name: 'mobile_tel_no' })
    @Expose()
    mobileTelNo: string;

    @Column({ name: 'office_tel_no' })
    @Expose()
    officeTelNo: string;

    @Column({ name: 'email' })
    @Expose()
    email: string;

    @Column({ name: 'first_timer' })
    @Expose()
    firstTimer: boolean;

    @Column({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;

    @OneToOne(() => UserTypeEntity, { eager: true })
    @JoinColumn({ name: 'type_id' })
    userType: UserTypeEntity;

    @OneToMany(
        () => ReportEntity,
        (report: ReportEntity) => report.reportUser,
    )
    @JoinColumn({ name: 'id' })
    reports: ReportEntity[];
}
