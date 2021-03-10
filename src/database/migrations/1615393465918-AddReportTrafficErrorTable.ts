import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class AddReportTrafficErrorTable1615393465918
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'report_traffic_errors',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'report_id',
                        type: 'int',
                    },
                    {
                        name: 'traffic_error_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'other_value',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true,
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'report_traffic_errors',
            new TableForeignKey({
                columnNames: ['report_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'reports',
            }),
        );
        await queryRunner.createForeignKey(
            'report_traffic_errors',
            new TableForeignKey({
                columnNames: ['traffic_error_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'traffic_errors',
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('report_traffic_errors');
    }
}
