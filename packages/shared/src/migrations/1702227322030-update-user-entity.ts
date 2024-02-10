import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1702227322030 implements MigrationInterface {
    name = 'UpdateUserEntity1702227322030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "displayName" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_31daa51074a24fcfcee3c4f08b2" UNIQUE ("displayName")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "provider" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatarUrl" character varying`);
        await queryRunner.query(`UPDATE "users" SET "email" = COALESCE("email", "username"), "displayName" = COALESCE("username") WHERE true;`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "displayName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "provider"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_31daa51074a24fcfcee3c4f08b2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "displayName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" text`);
    }

}
