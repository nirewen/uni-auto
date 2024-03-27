import { MigrationInterface, QueryRunner } from "typeorm";

export class InviteCodeAddUsesAndMaxuses1711505130409 implements MigrationInterface {
    name = 'InviteCodeAddUsesAndMaxuses1711505130409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD "uses" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD "maxUses" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP COLUMN "maxUses"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP COLUMN "uses"`);
    }

}
