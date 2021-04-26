import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
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

    async findOne(studentId: number): Promise<StudentEntity> {
        return this.studentRepository.findOne(studentId);
    }

    async findOneByStudentCode(studentCode: string): Promise<StudentEntity> {
        return this.studentRepository.findOne({ studentCode });
    }

    async findAllCollege(): Promise<CollegeEntity[]> {
        return this.collegeRepository.find();
    }

    async findAllCourse(): Promise<CourseEntity[]> {
        return this.courseRepository.find();
    }

    async findAllFaculty(): Promise<FacultyEntity[]> {
        return this.facultyRepository.find();
    }

    async create(dto: CreateStudentDto): Promise<StudentEntity> {
        const course = await this.courseRepository.findOne({
            name: dto.course,
        });
        const college = await this.collegeRepository.findOne({
            name: dto.college,
        });

        return this.studentRepository.save({
            studentCode: dto.studentCode,
            fullname: dto.fullname,
            studentCourse: course,
            studentCollege: college,
        } as StudentEntity);
    }

    async update(
        studentCode: string,
        dto: UpdateStudentDto,
        isAllowCreate: boolean = true,
    ): Promise<StudentEntity> {
        // if student not exist, create new student
        const existingStudent = await this.findOneByStudentCode(studentCode);
        if (!existingStudent) {
            if (isAllowCreate) {
                return this.create({
                    studentCode,
                    fullname: dto.fullname,
                    college: dto.college,
                    course: dto.course,
                } as CreateStudentDto);
            } else {
                throw new ResourceNotFoundException(
                    `Student code (${studentCode}) not found.`,
                );
            }
        }

        const course = await this.courseRepository.findOne({
            name: dto.course,
        });
        const college = await this.collegeRepository.findOne({
            name: dto.college,
        });

        return this.studentRepository.save({
            id: existingStudent?.id,
            fullname: dto?.fullname ?? existingStudent?.fullname,
            studentCourse: course ?? existingStudent?.studentCourse,
            studentCollege: college ?? existingStudent?.studentCollege,
        } as StudentEntity);
    }
}
