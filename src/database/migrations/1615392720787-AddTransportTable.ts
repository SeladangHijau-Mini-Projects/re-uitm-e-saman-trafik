import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class AddTransportTable1615392720787 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transports',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'student_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'type_id',
                        type: 'int',
                    },
                    {
                        name: 'status_id',
                        type: 'int',
                    },
                    {
                        name: 'plate_no',
                        type: 'varchar',
                    },
                    {
                        name: 'pass_code',
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
            'transports',
            new TableForeignKey({
                columnNames: ['student_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'students',
            }),
        );
        await queryRunner.createForeignKey(
            'transports',
            new TableForeignKey({
                columnNames: ['type_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'transport_types',
            }),
        );
        await queryRunner.createForeignKey(
            'transports',
            new TableForeignKey({
                columnNames: ['status_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'transport_statuses',
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('transports');
    }
}
