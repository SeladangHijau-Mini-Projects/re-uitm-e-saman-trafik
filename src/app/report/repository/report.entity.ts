import { Expose } from 'class-transformer';
import { StudentEntity } from 'src/app/student/repository/student.entity';
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
import { ReportStatusEntity } from './report-status.entity';
import { ReportTrafficErrorEntity } from './report-traffic-error.entity';

@Entity('reports')
export class ReportEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    @Expose()
    id: number;

    @Column({ name: 'status_id' })
    @Expose()
    statusId: number;

    @Column({ name: 'transport_id' })
    @Expose()
    transportId: number;

    @Column({ name: 'student_id' })
    @Expose()
    studentId: number;

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

    @ManyToOne(
        () => TransportEntity,
        (transport: TransportEntity) => transport.reports,
        { eager: true },
    )
    @JoinColumn({ name: 'transport_id' })
    transport: TransportEntity;

    @ManyToOne(
        () => StudentEntity,
        (student: StudentEntity) => student.reports,
        { eager: true },
    )
    @JoinColumn({ name: 'student_id' })
    student: StudentEntity;

    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.reports,
    )
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @OneToMany(
        () => ReportTrafficErrorEntity,
        (reportTrafficError: ReportTrafficErrorEntity) =>
            reportTrafficError.report,
    )
    @JoinColumn({ name: 'id' })
    reportTrafficErrors: ReportTrafficErrorEntity[];
}
