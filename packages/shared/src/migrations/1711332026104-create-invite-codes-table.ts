import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInviteCodesTable1711332026104 implements MigrationInterface {
    name = 'CreateInviteCodesTable1711332026104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invite_codes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "usedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, "assignedToId" uuid, "usableById" uuid, "usedById" uuid, CONSTRAINT "REL_c21f88094246d5582767d47ee6" UNIQUE ("usedById"), CONSTRAINT "PK_6c0ede25edb23ae63c935138e33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "FK_13374388e64f085ef0735ce5c7d" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "FK_0a0647cde96c174407a8c89c26c" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "FK_7bd28a6b93f4117205a9d07287a" FOREIGN KEY ("usableById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "FK_c21f88094246d5582767d47ee67" FOREIGN KEY ("usedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_c21f88094246d5582767d47ee67"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_7bd28a6b93f4117205a9d07287a"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_0a0647cde96c174407a8c89c26c"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_13374388e64f085ef0735ce5c7d"`);
        await queryRunner.query(`DROP TABLE "invite_codes"`);
    }

}
