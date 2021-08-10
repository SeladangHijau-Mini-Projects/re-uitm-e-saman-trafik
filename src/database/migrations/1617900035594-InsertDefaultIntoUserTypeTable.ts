import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoUserTypeTable1617900035594
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO user_types (code, description) values ('admin', 'Admin');`,
        );
        await queryRunner.query(
            `INSERT INTO user_types (code, description) values ('police', 'Police');`,
        );
        await queryRunner.query(
            `INSERT INTO user_types (code, description) values ('user', 'User');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM user_types;');
    }
}
