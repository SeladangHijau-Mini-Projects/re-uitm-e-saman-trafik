import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoCourse1615424761767
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO courses (faculty_id, name, description) values (1, 'cs230', 'Ijazah Sarjana Muda Sains Komputer Dan Matematik');`,
        );
        await queryRunner.query(
            `INSERT INTO courses (faculty_id, name, description) values (2, 'cs253', 'Ijazah Sarjana Muda Sains Komputer Dan Matematik (Multimedia)');`,
        );
        await queryRunner.query(
            `INSERT INTO courses (faculty_id, name, description) values (3, 'cs249', 'Ijazah Sarjana Muda Sains Matematik');`,
        );
        await queryRunner.query(
            `INSERT INTO courses (faculty_id, name, description) values (5, 'other', 'Lain-lain');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM courses;');
    }
}
