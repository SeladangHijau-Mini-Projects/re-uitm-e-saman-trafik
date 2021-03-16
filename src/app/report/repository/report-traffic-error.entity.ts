import { Expose } from 'class-transformer';
import { TrafficErrorEntity } from 'src/app/traffic-error/repository/traffic-error.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ReportEntity } from './report.entity';

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

    @ManyToOne(
        () => ReportEntity,
        (report: ReportEntity) => report.reportTrafficErrors,
    )
    @JoinColumn({ name: 'report_id' })
    report: ReportEntity;

    @ManyToOne(
        () => TrafficErrorEntity,
        (trafficError: TrafficErrorEntity) => trafficError.reportTrafficErrors,
    )
    @JoinColumn({ name: 'traffic_error_id' })
    trafficError: TrafficErrorEntity;
}
