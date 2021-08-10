import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class AddUserTable1615391391781 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'type_id',
                        type: 'int',
                    },
                    {
                        name: 'user_code',
                        type: 'varchar',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'mobile_tel_no',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'office_tel_no',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'first_timer',
                        type: 'tinyint',
                        default: 1,
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
            'users',
            new TableForeignKey({
                columnNames: ['type_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user_types',
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
