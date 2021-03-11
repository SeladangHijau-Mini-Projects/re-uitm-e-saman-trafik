import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoUserRank1615421065576
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO user_ranks (name, description) values ('UR1', 'Jawatan 1');`,
        );
        await queryRunner.query(
            `INSERT INTO user_ranks (name, description) values ('UR2', 'Jawatan 2');`,
        );
        await queryRunner.query(
            `INSERT INTO user_ranks (name, description) values ('UR3', 'Jawatan 3');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM user_ranks;');
    }
}
