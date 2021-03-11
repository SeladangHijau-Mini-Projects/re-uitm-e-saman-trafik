import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoCollege1615424690097
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO colleges (name, description) values ('delima', 'Delima');`,
        );
        await queryRunner.query(
            `INSERT INTO colleges (name, description) values ('perindu', 'Perindu');`,
        );
        await queryRunner.query(
            `INSERT INTO colleges (name, description) values ('mawar', 'Mawar');`,
        );
        await queryRunner.query(
            `INSERT INTO colleges (name, description) values ('kenanga', 'Kenanga');`,
        );
        await queryRunner.query(
            `INSERT INTO colleges (name, description) values ('other', 'Lain-lain');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM colleges;');
    }
}
