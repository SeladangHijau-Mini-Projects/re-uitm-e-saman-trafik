import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedFakeUser1618587228130 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                INSERT INTO users(
                    rank_id, type_id, user_code,
                    fullname, phone_tel_no, office_tel_no,
                    first_timer, email) 
                VALUES (
                    1, 1, 'A380',
                    'Nadzmi Admin', '01110849181', '044911376',
                    1, 'nadzmiidzham@gmail.com'
                );
            `,
        );
        await queryRunner.query(
            `
                INSERT INTO users(
                    rank_id, type_id, user_code,
                    fullname, phone_tel_no, office_tel_no,
                    first_timer, email) 
                VALUES (
                    1, 2, 'S380',
                    'Nadzmi Staff', '01110849181', '044911376',
                    1, 'nadzmiidzham@gmail.com'
                );
            `,
        );
        await queryRunner.query(
            `
                INSERT INTO users(
                    rank_id, type_id, user_code,
                    fullname, phone_tel_no, office_tel_no,
                    first_timer, email) 
                VALUES (
                    1, 3, 'P380',
                    'Nadzmi Police', '01110849181', '044911376',
                    1, 'nadzmiidzham@gmail.com'
                );
            `,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users WHERE true;`);
    }
}
