import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoUserRank1615421065576
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO user_ranks ('name', 'description') values ('UR1', NULL);`,
        );
        await queryRunner.query(
            `INSERT INTO user_ranks ('name', 'description') values ('UR2', NULL);`,
        );
        await queryRunner.query(
            `INSERT INTO user_ranks ('name', 'description') values ('UR3', NULL);`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('TRUNCATE user_ranks;');
    }
}
