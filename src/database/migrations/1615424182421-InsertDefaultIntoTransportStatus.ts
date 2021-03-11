import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoTransportStatus1615424182421
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
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

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM transport_statuses;');
    }
}
