import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeToUserDeletion1711831771214 implements MigrationInterface {
    name = 'AddCascadeToUserDeletion1711831771214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connections" DROP CONSTRAINT "FK_c8ee0b9afe383566cbe9243a09f"`);
        await queryRunner.query(`ALTER TABLE "invite_uses" DROP CONSTRAINT "FK_9ea0a39e2f8911edbea2d1f6d93"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_0a0647cde96c174407a8c89c26c"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_13374388e64f085ef0735ce5c7d"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_7bd28a6b93f4117205a9d07287a"`);
        await queryRunner.query(`ALTER TABLE "connections" ADD CONSTRAINT "FK_c8ee0b9afe383566cbe9243a09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_uses" ADD CONSTRAINT "FK_9ea0a39e2f8911edbea2d1f6d93" FOREIGN KEY ("usedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "FK_13374388e64f085ef0735ce5c7d" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "FK_0a0647cde96c174407a8c89c26c" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "FK_7bd28a6b93f4117205a9d07287a" FOREIGN KEY ("usableById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_7bd28a6b93f4117205a9d07287a"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_0a0647cde96c174407a8c89c26c"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_13374388e64f085ef0735ce5c7d"`);
        await queryRunner.query(`ALTER TABLE "invite_uses" DROP CONSTRAINT "FK_9ea0a39e2f8911edbea2d1f6d93"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP CONSTRAINT "FK_c8ee0b9afe383566cbe9243a09f"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "FK_7bd28a6b93f4117205a9d07287a" FOREIGN KEY ("usableById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "FK_13374388e64f085ef0735ce5c7d" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "FK_0a0647cde96c174407a8c89c26c" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_uses" ADD CONSTRAINT "FK_9ea0a39e2f8911edbea2d1f6d93" FOREIGN KEY ("usedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connections" ADD CONSTRAINT "FK_c8ee0b9afe383566cbe9243a09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
