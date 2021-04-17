import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForeignKeyToReport1616942255137 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'reports',
            new TableForeignKey({
                name: 'fk_reports_students',
                columnNames: ['student_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'students',
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('reports', 'fk_reports_students');
    }
}
