import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoTransportStatusTable1617900035595
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO transport_statuses (code, description) values ('hold', 'Hold');`,
        );
        await queryRunner.query(
            `INSERT INTO transport_statuses (code, description) values ('released', 'Released');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM transport_statuses;');
    }
}
