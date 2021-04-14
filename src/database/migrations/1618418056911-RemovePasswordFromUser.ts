import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePasswordFromUser1618418056911 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP COLUMN password;`);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users ADD password varchar(255) NOT NULL;`,
        );
    }
}
