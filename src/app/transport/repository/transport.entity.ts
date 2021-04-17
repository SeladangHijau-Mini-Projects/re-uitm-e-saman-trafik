import { Expose } from 'class-transformer';
import { StudentEntity } from 'src/app/student/repository/student.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TransportStatusEntity } from './transport-status.entity';
import { TransportTypeEntity } from './transport-type.entity';

@Entity('transports')
export class TransportEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ name: 'student_id' })
    @Expose()
    studentId: number;

    @Column({ name: 'type_id' })
    @Expose()
    typeId: number;

    @Column({ name: 'status_id' })
    @Expose()
    statusId: number;

    @Column({ name: 'plate_no' })
    @Expose()
    plateNo: string;

    @Column({ name: 'pass_code' })
    @Expose()
    passCode: string;

    @Column({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;

    @OneToOne(() => TransportTypeEntity, { eager: true })
    @JoinColumn({ name: 'type_id' })
    transportType: TransportTypeEntity;

    @OneToOne(() => TransportStatusEntity, { eager: true })
    @JoinColumn({ name: 'status_id' })
    transportStatus: TransportStatusEntity;

    @ManyToOne(
        () => StudentEntity,
        (student: StudentEntity) => student.studentTransports,
    )
    @JoinColumn({ name: 'id' })
    transportStudent: StudentEntity;
}
