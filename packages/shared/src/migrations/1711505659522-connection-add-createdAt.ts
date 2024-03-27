import { MigrationInterface, QueryRunner } from "typeorm";

export class ConnectionAddCreatedAt1711505659522 implements MigrationInterface {
    name = 'ConnectionAddCreatedAt1711505659522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connections" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "connections" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connections" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP COLUMN "createdAt"`);
    }

}
