import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class AddReportTable1615393070973 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'reports',
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
                        name: 'transport_id',
                        type: 'int',
                    },
                    {
                        name: 'student_id',
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
            'reports',
            new TableForeignKey({
                columnNames: ['status_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'report_statuses',
            }),
        );
        await queryRunner.createForeignKey(
            'reports',
            new TableForeignKey({
                columnNames: ['transport_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'transports',
            }),
        );
        await queryRunner.createForeignKey(
            'reports',
            new TableForeignKey({
                columnNames: ['student_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'students',
            }),
        );
        await queryRunner.createForeignKey(
            'reports',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reports');
    }
}
