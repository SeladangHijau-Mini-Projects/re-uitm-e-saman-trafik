import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './repository/student.entity';
import { StudentService } from './student.service';

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity])],
    providers: [StudentService],
    exports: [StudentService],
})
export class StudentModule {}
