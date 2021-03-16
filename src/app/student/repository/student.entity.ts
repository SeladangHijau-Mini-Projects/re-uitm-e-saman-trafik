import { Expose } from 'class-transformer';
import { TransportEntity } from 'src/app/transport/repository/transport.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CollegeEntity } from './college.entity';
import { CourseEntity } from './course.entity';

@Entity('students')
export class StudentEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ name: 'course_id' })
    @Expose()
    courseId: number;

    @Column({ name: 'college_id' })
    @Expose()
    collegeId: number;

    @Column({ name: 'student_code' })
    @Expose()
    studentCode: string;

    @Column({ name: 'fullname' })
    @Expose()
    fullname: string;

    @Column({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;

    @OneToOne(() => CourseEntity, { eager: true })
    @JoinColumn({ name: 'course_id' })
    course: CourseEntity;

    @OneToOne(() => CollegeEntity, { eager: true })
    @JoinColumn({ name: 'college_id' })
    college: CollegeEntity;

    @OneToMany(
        () => TransportEntity,
        (transport: TransportEntity) => transport.student,
    )
    @JoinColumn({ name: 'id' })
    transports: TransportEntity[];
}
