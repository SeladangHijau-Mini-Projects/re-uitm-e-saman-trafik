import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollegeEntity } from './repository/college.entity';
import { CourseEntity } from './repository/course.entity';
import { FacultyEntity } from './repository/faculty.entity';
import { StudentEntity } from './repository/student.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private readonly studentRepository: Repository<StudentEntity>,
        @InjectRepository(CollegeEntity)
        private readonly collegeRepository: Repository<CollegeEntity>,
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>,
        @InjectRepository(FacultyEntity)
        private readonly facultyRepository: Repository<FacultyEntity>,
    ) {}
}
