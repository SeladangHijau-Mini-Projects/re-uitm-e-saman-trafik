import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class AddNotificationTable1617900035592 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'notifications',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'status_id',
                        type: 'int',
                    },
                    {
                        name: 'report_id',
                        type: 'int',
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                    },
                    {
                        name: 'reference',
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
            'notifications',
            new TableForeignKey({
                columnNames: ['status_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'notification_statuses',
            }),
        );
        await queryRunner.createForeignKey(
            'notifications',
            new TableForeignKey({
                columnNames: ['report_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'reports',
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('notifications');
    }
}
