import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedFakeUser1618587228130 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
        await queryRunner.query(
            `
                INSERT INTO users(
                    type_id, code,
                    name, mobile_tel_no, office_tel_no,
                    first_timer, email
                ) 
                VALUES (
                    1, 'A380',
                    'Nadzmi Admin', '01110849181', '044911376',
                    1, 'nadzmiidzham@gmail.com'
                );
            `,
        );
        await queryRunner.query(
            `
                INSERT INTO users(
                    type_id, code,
                    name, mobile_tel_no, office_tel_no,
                    first_timer, email
                ) 
                VALUES (
                    2, 'S380',
                    'Nadzmi Staff', '01110849181', '044911376',
                    1, 'nadzmiidzham@gmail.com'
                );
            `,
        );
        await queryRunner.query(
            `
                INSERT INTO users(
                    type_id, code,
                    name, mobile_tel_no, office_tel_no,
                    first_timer, email
                ) 
                VALUES (
                    3, 'P380',
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
