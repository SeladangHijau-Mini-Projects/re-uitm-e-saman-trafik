import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceNotFoundException } from 'src/common/exception/resource-not-found.exception';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './repository/student.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private readonly studentRepository: Repository<StudentEntity>,
    ) {}

    async findOne(studentId: number): Promise<StudentEntity> {
        return this.studentRepository.findOne(studentId);
    }

    async findOneByStudentCode(code: string): Promise<StudentEntity> {
        return this.studentRepository.findOne({ code });
    }

    async create(dto: CreateStudentDto): Promise<StudentEntity> {
        return this.studentRepository.save({
            code: dto?.code,
            name: dto?.name,
        } as StudentEntity);
    }

    async update(
        studentId: number,
        dto: UpdateStudentDto,
        isAllowCreate: boolean = true,
    ): Promise<StudentEntity> {
        // if student not exist, create new student
        const existingStudent = await this.findOne(studentId);
        if (!existingStudent) {
            if (isAllowCreate) {
                return this.create({
                    code: dto?.code,
                    name: dto?.name,
                } as CreateStudentDto);
            } else {
                throw new ResourceNotFoundException(
                    `Student id (${studentId}) not found.`,
                );
            }
        }

        return this.studentRepository.save({
            id: existingStudent?.id,
            name: dto?.name ?? existingStudent?.name,
        } as StudentEntity);
    }

    async updateByStudentCode(
        code: string,
        dto: UpdateStudentDto,
        isAllowCreate: boolean = true,
    ): Promise<StudentEntity> {
        // if student not exist, create new student
        const existingStudent = await this.findOneByStudentCode(code);
        if (!existingStudent) {
            if (isAllowCreate) {
                return this.create({
                    code,
                    name: dto?.name,
                } as CreateStudentDto);
            } else {
                throw new ResourceNotFoundException(
                    `Student code (${code}) not found.`,
                );
            }
        }

        return this.studentRepository.save({
            id: existingStudent?.id,
            name: dto?.name ?? existingStudent?.name,
        } as StudentEntity);
    }
}
