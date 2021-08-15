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
import { TransportStatusEntity } from './transport-status.entity';

@Entity('transports')
export class TransportEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ name: 'status_id' })
    @Expose()
    statusId: number;

    @Column({ name: 'code' })
    @Expose()
    code: string;

    @Column({ name: 'plate_no' })
    @Expose()
    plateNo: string;

    @Column({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;

    @OneToOne(() => TransportStatusEntity, { eager: true })
    @JoinColumn({ name: 'status_id' })
    status: TransportStatusEntity;

    @OneToMany(
        () => ReportEntity,
        (report: ReportEntity) => report.transport,
    )
    @JoinColumn({ name: 'id' })
    reports: ReportEntity[];
}
