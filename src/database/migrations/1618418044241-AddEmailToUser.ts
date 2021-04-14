import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailToUser1618418044241 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users ADD email varchar(50) NOT NULL;`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP COLUMN email;`);
    }
}
