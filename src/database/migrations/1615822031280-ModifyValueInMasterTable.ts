import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyValueInMasterTable1615822031280
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM report_statuses;');
        await queryRunner.query(
            `INSERT INTO report_statuses (name, description) values ('new', 'New');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (name, description) values ('assigned', 'Assigned');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (name, description) values ('enforced', 'Enforced');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (name, description) values ('released', 'Released');`,
        );
        await queryRunner.query(
            `INSERT INTO report_statuses (name, description) values ('closed', 'Closed');`,
        );

        await queryRunner.query('DELETE FROM transport_statuses;');
        await queryRunner.query(
            `INSERT INTO transport_statuses (name, description) values ('na', 'Not Applicable');`,
        );
        await queryRunner.query(
            `INSERT INTO transport_statuses (name, description) values ('summoned', 'Disaman');`,
        );
        await queryRunner.query(
            `INSERT INTO transport_statuses (name, description) values ('locked', 'Dikunci');`,
        );
        await queryRunner.query(
            `INSERT INTO transport_statuses (name, description) values ('released', 'Released');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM report_statuses;');
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

        await queryRunner.query('DELETE FROM transport_statuses;');
        await queryRunner.query(
            `INSERT INTO transport_statuses (name, description) values ('na', 'Not Applicable');`,
        );
        await queryRunner.query(
            `INSERT INTO transport_statuses (name, description) values ('summoned', 'Disaman');`,
        );
        await queryRunner.query(
            `INSERT INTO transport_statuses (name, description) values ('locked', 'Dikunci');`,
        );
    }
}
