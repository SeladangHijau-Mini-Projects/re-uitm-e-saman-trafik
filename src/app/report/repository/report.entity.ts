import { Expose } from 'class-transformer';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportStatusEntity } from './report-status.entity';
import { TransportEntity } from './transport.entity';

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
    userId: number; // TODO: create relationship for this

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
}
