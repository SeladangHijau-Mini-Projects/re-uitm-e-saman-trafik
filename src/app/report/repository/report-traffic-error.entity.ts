import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('report_traffic_errors')
export class ReportTrafficErrorEntity {
    @PrimaryColumn({ name: 'id' })
    @Expose()
    id: number;

    @Column({ name: 'report_id' })
    @Expose()
    reportId: number;

    @Column({ name: 'traffic_error_id' })
    @Expose()
    trafficErrorId: number;

    @Column({ name: 'other_value' })
    @Expose()
    otherValue: string;

    @Column({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;
}
