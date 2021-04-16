import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStudentIdToReport1615904495315 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE reports ADD student_id int;`);
        await queryRunner.query(
            `ALTER TABLE report_histories ADD student_id int;`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE reports DROP COLUMN student_id;`);
        await queryRunner.query(
            `ALTER TABLE report_histories DROP COLUMN student_id;`,
        );
    }
}
