import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStudentIdToReport1615904495315 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE reports ADD student_id int NOT NULL;`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE reports DROP COLUMN student_id;`);
    }
}
