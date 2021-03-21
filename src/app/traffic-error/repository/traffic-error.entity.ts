import { Expose } from 'class-transformer';
import { ReportEntity } from 'src/app/report/repository/report.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

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

    @ManyToMany(
        () => ReportEntity,
        (report: ReportEntity) => report.trafficErrors,
    )
    reports: ReportEntity[];
}
