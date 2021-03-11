import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoFaculty1615424578874
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO faculties (name, description) values ('fskm', 'Fakulti Sains Komputer Dan Matematik');`,
        );
        await queryRunner.query(
            `INSERT INTO faculties (name, description) values ('fkm', 'Fakulti Kejuruteraan mekanikal');`,
        );
        await queryRunner.query(
            `INSERT INTO faculties (name, description) values ('fsg', 'Fakulti Sains Gunaan');`,
        );
        await queryRunner.query(
            `INSERT INTO faculties (name, description) values ('fspu', 'Fakulti Seni Bina, Perancangan Dan Ukur');`,
        );
        await queryRunner.query(
            `INSERT INTO faculties (name, description) values ('other', 'Lain-lain');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM faculties;');
    }
}
