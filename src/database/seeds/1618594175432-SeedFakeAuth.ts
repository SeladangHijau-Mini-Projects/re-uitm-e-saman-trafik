import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedFakeAuth1618594175432 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                INSERT INTO auths(
                    user_id, password, reset_token
                ) 
                VALUES (
                    1, 'new password', NULL
                );
            `,
        );
        await queryRunner.query(
            `
                INSERT INTO auths(
                    user_id, password, reset_token
                ) 
                VALUES (
                    2, 'new password', NULL
                );
            `,
        );
        await queryRunner.query(
            `
                INSERT INTO auths(
                    user_id, password, reset_token
                ) 
                VALUES (
                    3, 'new password', NULL
                );
            `,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM auths WHERE true;`);
    }
}
