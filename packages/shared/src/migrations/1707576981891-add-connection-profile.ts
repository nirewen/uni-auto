import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConnectionProfile1707576981891 implements MigrationInterface {
    name = 'AddConnectionProfile1707576981891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "connection_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "displayName" character varying NOT NULL, "avatarUrl" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "connectionId" uuid, CONSTRAINT "REL_bbf8615049cd7ce5b3b7d6a99e" UNIQUE ("connectionId"), CONSTRAINT "PK_c4a5f6729067dea835ef0b2ef92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "connections" ADD "profileId" uuid`);
        await queryRunner.query(`ALTER TABLE "connections" ADD CONSTRAINT "UQ_0f458a934f3d1ef91091a42590a" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "connection_profile" ADD CONSTRAINT "FK_bbf8615049cd7ce5b3b7d6a99e2" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connections" ADD CONSTRAINT "FK_0f458a934f3d1ef91091a42590a" FOREIGN KEY ("profileId") REFERENCES "connection_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connections" DROP CONSTRAINT "FK_0f458a934f3d1ef91091a42590a"`);
        await queryRunner.query(`ALTER TABLE "connection_profile" DROP CONSTRAINT "FK_bbf8615049cd7ce5b3b7d6a99e2"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP CONSTRAINT "UQ_0f458a934f3d1ef91091a42590a"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP COLUMN "profileId"`);
        await queryRunner.query(`DROP TABLE "connection_profile"`);
    }

}
