import { Expose } from 'class-transformer';
import { TransportEntity } from 'src/app/transport/repository/transport.entity';
import { UserEntity } from 'src/app/user/repository/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportHistoryEntity } from './report-history.entity';
import { ReportStatusEntity } from './report-status.entity';

@Entity('reports')
export class ReportEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ name: 'status_id' })
    @Expose()
    statusId: number;

    @Column({ name: 'transport_id' })
    @Expose()
    transportId: number;

    @Column({ name: 'user_id' })
    @Expose()
    userId: number;

    @Column({ name: 'location' })
    @Expose()
    location: string;

    @Column({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;

    @OneToOne(() => ReportStatusEntity, { eager: true })
    @JoinColumn({ name: 'status_id' })
    status: ReportStatusEntity;

    @OneToOne(() => TransportEntity, { eager: true })
    @JoinColumn({ name: 'transport_id' })
    transport: TransportEntity;

    @OneToMany(
        () => ReportHistoryEntity,
        (history: ReportHistoryEntity) => history.report,
    )
    @JoinColumn({ name: 'id' })
    histories: ReportHistoryEntity[];

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'id' })
    user: UserEntity;
}
