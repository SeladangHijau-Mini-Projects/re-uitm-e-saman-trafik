import { Expose } from 'class-transformer';
import { TransportEntity } from 'src/app/transport/repository/transport.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportStatusEntity } from './report-status.entity';
import { ReportEntity } from './report.entity';

@Entity('report_histories')
export class ReportHistoryEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    @Expose()
    id: number;

    @Column({ name: 'report_id' })
    @Expose()
    reportId: number;

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

    @Column({ name: 'remark' })
    @Expose()
    remark: string;

    @Column({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;

    @OneToOne(() => ReportStatusEntity, { eager: true })
    @JoinColumn({ name: 'status_id' })
    reportHistoryStatus: ReportStatusEntity;

    @OneToOne(() => TransportEntity, { eager: true })
    @JoinColumn({ name: 'transport_id' })
    reportHistoryTransport: TransportEntity;

    @ManyToOne(
        () => ReportEntity,
        (report: ReportEntity) => report.reportHistories,
    )
    @JoinColumn({ name: 'report_id' })
    reportHistoryReport: ReportEntity;
}
