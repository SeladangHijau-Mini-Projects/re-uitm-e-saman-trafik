import { Expose } from 'class-transformer';
import { ReportHistoryEntity } from 'src/app/report/repository/report-history.entity';
import { ReportEntity } from 'src/app/report/repository/report.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRankEntity } from './user-rank.entity';
import { UserTypeEntity } from './user-type.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    @Expose()
    id: number;

    @Column({ name: 'rank_id' })
    @Expose()
    rankId: number;

    @Column({ name: 'type_id' })
    @Expose()
    typeId: number;

    @Column({ name: 'user_code' })
    @Expose()
    userCode: string;

    @Column({ name: 'password' })
    @Expose()
    password: string;

    @Column({ name: 'fullname' })
    @Expose()
    fullname: string;

    @Column({ name: 'phone_tel_no' })
    @Expose()
    phoneTelNo: string;

    @Column({ name: 'office_tel_no' })
    @Expose()
    officeTelNo: string;

    @Column({ name: 'first_timer' })
    @Expose()
    firstTimer: boolean;

    @Column({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;

    @OneToOne(() => UserRankEntity, { eager: true })
    @JoinColumn({ name: 'rank_id' })
    userRank: UserRankEntity;

    @OneToOne(() => UserTypeEntity, { eager: true })
    @JoinColumn({ name: 'type_id' })
    userType: UserTypeEntity;

    @OneToMany(
        () => ReportEntity,
        (report: ReportEntity) => report.reportUser,
    )
    @JoinColumn({ name: 'id' })
    reports: ReportEntity[];

    @OneToMany(
        () => ReportHistoryEntity,
        (reportHistory: ReportHistoryEntity) => reportHistory.user,
    )
    @JoinColumn({ name: 'id' })
    reportHistories: ReportHistoryEntity[];
}
