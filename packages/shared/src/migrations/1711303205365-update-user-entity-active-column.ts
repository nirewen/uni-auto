import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntityActiveColumn1711303205365 implements MigrationInterface {
    name = 'UpdateUserEntityActiveColumn1711303205365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
    }

}
