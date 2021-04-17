import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeEntity } from './repository/college.entity';
import { CourseEntity } from './repository/course.entity';
import { FacultyEntity } from './repository/faculty.entity';
import { StudentEntity } from './repository/student.entity';
import { StudentService } from './student.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            StudentEntity,
            CollegeEntity,
            CourseEntity,
            FacultyEntity,
        ]),
    ],
    providers: [StudentService],
    exports: [StudentService],
})
export class StudentModule {}
