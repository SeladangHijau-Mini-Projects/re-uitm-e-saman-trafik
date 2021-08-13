import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoReportStatusTable1617900035597
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO report_statuses (code, description) values ('new', 'New');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (code, description) values ('assigned', 'Assigned');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (code, description) values ('enforced', 'Enforced');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (code, description) values ('released', 'Released');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (code, description) values ('pending-closed', 'Pending Closed');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (code, description) values ('closed', 'Closed');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM report_statuses;');
    }
}
