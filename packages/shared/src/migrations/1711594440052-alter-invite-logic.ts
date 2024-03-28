import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterInviteLogic1711594440052 implements MigrationInterface {
    name = 'AlterInviteLogic1711594440052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_c21f88094246d5582767d47ee67"`);
        await queryRunner.query(`CREATE TABLE "invite_uses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usedAt" TIMESTAMP NOT NULL DEFAULT now(), "inviteId" uuid, "usedById" uuid, CONSTRAINT "PK_8de41c44c1f5956cdd16beb35d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP COLUMN "uses"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "REL_c21f88094246d5582767d47ee6"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP COLUMN "usedById"`);
        await queryRunner.query(`ALTER TABLE "invite_uses" ADD CONSTRAINT "FK_3745382ca503cc857af49b140e7" FOREIGN KEY ("inviteId") REFERENCES "invite_codes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_uses" ADD CONSTRAINT "FK_9ea0a39e2f8911edbea2d1f6d93" FOREIGN KEY ("usedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite_uses" DROP CONSTRAINT "FK_9ea0a39e2f8911edbea2d1f6d93"`);
        await queryRunner.query(`ALTER TABLE "invite_uses" DROP CONSTRAINT "FK_3745382ca503cc857af49b140e7"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD "usedById" uuid`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "REL_c21f88094246d5582767d47ee6" UNIQUE ("usedById")`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD "uses" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`DROP TABLE "invite_uses"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "FK_c21f88094246d5582767d47ee67" FOREIGN KEY ("usedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
