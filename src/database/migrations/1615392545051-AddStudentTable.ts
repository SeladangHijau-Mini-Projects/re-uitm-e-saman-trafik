import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class AddStudentTable1615392545051 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'students',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'course_id',
                        type: 'int',
                    },
                    {
                        name: 'college_id',
                        type: 'int',
                    },
                    {
                        name: 'student_code',
                        type: 'varchar',
                    },
                    {
                        name: 'fullname',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true,
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'students',
            new TableForeignKey({
                columnNames: ['course_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'courses',
            }),
        );
        await queryRunner.createForeignKey(
            'students',
            new TableForeignKey({
                columnNames: ['college_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'colleges',
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('students');
    }
}
