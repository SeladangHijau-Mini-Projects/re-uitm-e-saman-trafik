import { Expose } from 'class-transformer';
import { ReportTrafficErrorEntity } from 'src/app/report/repository/report-traffic-error.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('traffic_errors')
export class TrafficErrorEntity {
    @PrimaryColumn({ name: 'id' })
    @Expose()
    id: number;

    @Column({ name: 'group_id' })
    @Expose()
    groupId: number;

    @Column({ name: 'name' })
    @Expose()
    name: string;

    @Column({ name: 'description' })
    @Expose()
    description: string;

    @Column({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;

    @OneToMany(
        () => ReportTrafficErrorEntity,
        (reportTrafficError: ReportTrafficErrorEntity) =>
            reportTrafficError.trafficError,
    )
    @JoinColumn({ name: 'id' })
    reportTrafficErrors: ReportTrafficErrorEntity[];
}
