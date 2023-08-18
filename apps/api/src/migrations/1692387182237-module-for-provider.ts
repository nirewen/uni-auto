import { MigrationInterface, QueryRunner } from "typeorm";

export class ModuleForProvider1692387182237 implements MigrationInterface {
    name = 'ModuleForProvider1692387182237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modules" ADD "providers" text array DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modules" DROP COLUMN "providers"`);
    }

}
