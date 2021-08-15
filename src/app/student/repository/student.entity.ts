import { Expose } from 'class-transformer';
import { ReportEntity } from 'src/app/report/repository/report.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('students')
export class StudentEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ name: 'code' })
    @Expose()
    code: string;

    @Column({ name: 'name' })
    @Expose()
    name: string;

    @Column({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;

    @OneToMany(
        () => ReportEntity,
        (report: ReportEntity) => report.student,
    )
    @JoinColumn({ name: 'id' })
    reports: ReportEntity[];
}
