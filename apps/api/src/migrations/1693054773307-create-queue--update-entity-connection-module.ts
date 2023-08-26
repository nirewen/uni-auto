import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQueueUpdateEntityConnectionModule1693054773307 implements MigrationInterface {
    name = 'CreateQueue-UpdateEntityConnectionModule1693054773307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."queue_status_enum" AS ENUM('PENDING', 'COMPLETED')`);
        await queryRunner.query(`CREATE TABLE "queue" ("id" SERIAL NOT NULL, "status" "public"."queue_status_enum" NOT NULL DEFAULT 'PENDING', "data" json NOT NULL, "endpoint" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "connectionId" uuid, CONSTRAINT "PK_4adefbd9c73b3f9a49985a5529f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "connection_module" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "connection_module" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "queue" ADD CONSTRAINT "FK_527f0feb0b0cfaff3a3dd3439d9" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queue" DROP CONSTRAINT "FK_527f0feb0b0cfaff3a3dd3439d9"`);
        await queryRunner.query(`ALTER TABLE "connection_module" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "connection_module" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`DROP TABLE "queue"`);
        await queryRunner.query(`DROP TYPE "public"."queue_status_enum"`);
    }

}
