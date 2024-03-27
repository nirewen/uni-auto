import { MigrationInterface, QueryRunner } from "typeorm";

export class InviteCodeAddCodeAndRole1711502799356 implements MigrationInterface {
    name = 'InviteCodeAddCodeAndRole1711502799356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD "code" character varying NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD CONSTRAINT "UQ_e8034125cb28e0814cd5a526c20" UNIQUE ("code")`);
        await queryRunner.query(`CREATE TYPE "public"."invite_codes_role_enum" AS ENUM('ACCOUNT_ACTIVATION')`);
        await queryRunner.query(`ALTER TABLE "invite_codes" ADD "role" "public"."invite_codes_role_enum" NOT NULL DEFAULT 'ACCOUNT_ACTIVATION'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."invite_codes_role_enum"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP CONSTRAINT "UQ_e8034125cb28e0814cd5a526c20"`);
        await queryRunner.query(`ALTER TABLE "invite_codes" DROP COLUMN "code"`);
    }

}
