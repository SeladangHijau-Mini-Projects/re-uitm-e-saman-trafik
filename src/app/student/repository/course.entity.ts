import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { FacultyEntity } from './faculty.entity';

@Entity('courses')
export class CourseEntity {
    @PrimaryColumn({ name: 'id' })
    @Expose()
    id: number;

    @Column({ name: 'faculty_id' })
    @Expose()
    facultyId: number;

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

    @OneToOne(() => FacultyEntity, { eager: true })
    @JoinColumn({ name: 'faculty_id' })
    courseFaculty: FacultyEntity;
}
