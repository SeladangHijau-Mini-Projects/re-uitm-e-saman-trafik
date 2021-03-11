import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class AddReportHistoriesTable1615393303291
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'report_histories',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'report_id',
                        type: 'int',
                    },
                    {
                        name: 'status_id',
                        type: 'int',
                    },
                    {
                        name: 'transport_id',
                        type: 'int',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                    },
                    {
                        name: 'location',
                        type: 'varchar',
                    },
                    {
                        name: 'remark',
                        type: 'varchar',
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
            'report_histories',
            new TableForeignKey({
                columnNames: ['report_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'reports',
            }),
        );
        await queryRunner.createForeignKey(
            'report_histories',
            new TableForeignKey({
                columnNames: ['status_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'report_statuses',
            }),
        );
        await queryRunner.createForeignKey(
            'report_histories',
            new TableForeignKey({
                columnNames: ['transport_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'transports',
            }),
        );
        await queryRunner.createForeignKey(
            'report_histories',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('report_histories');
    }
}
