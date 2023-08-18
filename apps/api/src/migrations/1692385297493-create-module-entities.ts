import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateModuleEntities1692385297493 implements MigrationInterface {
    name = 'CreateModuleEntities1692385297493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "modules" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "enabled" boolean NOT NULL, CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "module_settings" ("id" SERIAL NOT NULL, "settings" json NOT NULL, "enabled" boolean NOT NULL, "moduleId" integer, "connectionId" uuid, CONSTRAINT "PK_06cc7f4c00d4cd1c81a6c876017" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD CONSTRAINT "FK_4c28efd4a21c81a25d3e7b0ba0f" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD CONSTRAINT "FK_d60a17c30480e9de74452583f2f" FOREIGN KEY ("connectionId") REFERENCES "connection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "module_settings" DROP CONSTRAINT "FK_d60a17c30480e9de74452583f2f"`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP CONSTRAINT "FK_4c28efd4a21c81a25d3e7b0ba0f"`);
        await queryRunner.query(`DROP TABLE "module_settings"`);
        await queryRunner.query(`DROP TABLE "modules"`);
    }

}
