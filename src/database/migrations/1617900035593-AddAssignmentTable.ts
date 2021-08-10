import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class AddAssignmentTable1617900035593 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'assignments',
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
                        name: 'user_id',
                        type: 'int',
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
            'assignments',
            new TableForeignKey({
                columnNames: ['report_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'reports',
            }),
        );
        await queryRunner.createForeignKey(
            'assignments',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('assignments');
    }
}
