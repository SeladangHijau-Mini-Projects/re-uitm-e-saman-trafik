import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoUserType1615422159150
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO user_types (name, description) values ('admin', 'Admin');`,
        );
        await queryRunner.query(
            `INSERT INTO user_types (name, description) values ('staff', 'Staff');`,
        );
        await queryRunner.query(
            `INSERT INTO user_types (name, description) values ('police', 'Polis');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM user_types;');
    }
}
