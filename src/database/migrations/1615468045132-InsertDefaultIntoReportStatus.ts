import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoReportStatus1615468045132
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO report_statuses (name, description) values ('reported', 'DILAPORKAN');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (name, description) values ('scheduled', 'DIJADUALKAN');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (name, description) values ('enforced', 'DIKUATKUASAKAN');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (name, description) values ('closed', 'DITUTUP');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM report_statuses;');
    }
}
