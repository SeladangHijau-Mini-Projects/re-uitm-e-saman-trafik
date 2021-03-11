import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultIntoTrafficError1615425238531
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('e1', 'MELETAK DI TEMPAT LARANGAN/DIKHASKAN');`,
        );
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('e2', 'MELETAK DILUAR PETAK/PETAK KUNING');`,
        );
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('e3', 'MENGHALANG LALUAN');`,
        );
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('e4', 'TIADA LESEN MEMANDU/TAMAT TEMPOH');`,
        );
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('e5', 'LESEN (L) MEMBAWA PEMBONCENG');`,
        );
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('e6', 'TIADA CUKAI JALAN YANG SAH/TAMAT TEMPOH');`,
        );
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('e7', 'MELANGAR JALAN SEHALA/DILARANG MASUK');`,
        );
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('e8', 'TIDAK MEMAKAI TOPI KELEDAR PENUNGGANG/PEMBONCENG');`,
        );
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('e9', 'TIADA PELEKAT UITM TERKINI');`,
        );
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('e10', 'MELETAK DI KORIDOR/LALUAN PEJALAN KAKI');`,
        );
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('e11', 'KENDERAAN DIKUNCI');`,
        );
        await queryRunner.query(
            `INSERT INTO traffic_errors (name, description) values ('other', 'LAIN-LAIN (NYATAKAN DI BAHAGIAN PENERANGAN)');`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM traffic_errors;');
    }
}
