import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoTransportType1615424458884
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO transport_types (name, description) values ('motorcycle', 'Motorsikal');`,
        );
        await queryRunner.query(
            `INSERT INTO transport_types (name, description) values ('car', 'Kereta');`,
        );
        await queryRunner.query(
            `INSERT INTO transport_types (name, description) values ('other', 'Lain-lain');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM transport_types;');
    }
}
