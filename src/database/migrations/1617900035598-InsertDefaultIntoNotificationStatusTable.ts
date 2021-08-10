import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoNotificationStatusTable1617900035598
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO notification_statuses (code, description) values ('pending', 'Pending');`,
        );
        await queryRunner.query(
            `INSERT INTO notification_statuses (code, description) values ('success', 'Success');`,
        );
        await queryRunner.query(
            `INSERT INTO notification_statuses (code, description) values ('failed', 'Failed');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM notification_statuses;');
    }
}
