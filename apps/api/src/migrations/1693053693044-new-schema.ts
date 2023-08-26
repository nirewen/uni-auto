import { MigrationInterface, QueryRunner } from "typeorm";

export class NewSchema1693053693044 implements MigrationInterface {
    name = 'NewSchema1693053693044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "module_settings" DROP CONSTRAINT "FK_d60a17c30480e9de74452583f2f"`);
        await queryRunner.query(`ALTER TABLE "connection" RENAME COLUMN "provider" TO "providerId"`);
        await queryRunner.query(`CREATE TABLE "provider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "enabled" boolean NOT NULL, "connectionsId" uuid, CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "connection_module" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "settings" json NOT NULL, "enabled" boolean NOT NULL, "moduleId" uuid, "connectionId" uuid, CONSTRAINT "PK_1ccdc9716fdbef8a437c6c8504f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "modules" DROP COLUMN "providers"`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP COLUMN "connectionId"`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD "providerId" uuid`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP CONSTRAINT "FK_4c28efd4a21c81a25d3e7b0ba0f"`);
        await queryRunner.query(`ALTER TABLE "modules" DROP CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95"`);
        await queryRunner.query(`ALTER TABLE "modules" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "modules" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "modules" ADD CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP CONSTRAINT "PK_06cc7f4c00d4cd1c81a6c876017"`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD CONSTRAINT "PK_06cc7f4c00d4cd1c81a6c876017" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP COLUMN "moduleId"`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD "moduleId" uuid`);
        await queryRunner.query(`ALTER TABLE "connection" DROP COLUMN "providerId"`);
        await queryRunner.query(`ALTER TABLE "connection" ADD "providerId" uuid`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD CONSTRAINT "FK_4c28efd4a21c81a25d3e7b0ba0f" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD CONSTRAINT "FK_116c1d15a4259346652694ed88d" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_b5195bf0be7806110374dbbe509" FOREIGN KEY ("connectionsId") REFERENCES "connection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_901b4434c529e5767bc04f8c1a1" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection_module" ADD CONSTRAINT "FK_b96dde8788005a8e2e4ee186cfd" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection_module" ADD CONSTRAINT "FK_f10d4281afdcd5006dfa15f55f9" FOREIGN KEY ("connectionId") REFERENCES "connection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connection_module" DROP CONSTRAINT "FK_f10d4281afdcd5006dfa15f55f9"`);
        await queryRunner.query(`ALTER TABLE "connection_module" DROP CONSTRAINT "FK_b96dde8788005a8e2e4ee186cfd"`);
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_901b4434c529e5767bc04f8c1a1"`);
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "FK_b5195bf0be7806110374dbbe509"`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP CONSTRAINT "FK_116c1d15a4259346652694ed88d"`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP CONSTRAINT "FK_4c28efd4a21c81a25d3e7b0ba0f"`);
        await queryRunner.query(`ALTER TABLE "connection" DROP COLUMN "providerId"`);
        await queryRunner.query(`ALTER TABLE "connection" ADD "providerId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP COLUMN "moduleId"`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD "moduleId" integer`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP CONSTRAINT "PK_06cc7f4c00d4cd1c81a6c876017"`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD CONSTRAINT "PK_06cc7f4c00d4cd1c81a6c876017" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "modules" DROP CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95"`);
        await queryRunner.query(`ALTER TABLE "modules" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "modules" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "modules" ADD CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD CONSTRAINT "FK_4c28efd4a21c81a25d3e7b0ba0f" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP COLUMN "providerId"`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD "connectionId" uuid`);
        await queryRunner.query(`ALTER TABLE "modules" ADD "providers" text array DEFAULT '{}'`);
        await queryRunner.query(`DROP TABLE "connection_module"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`ALTER TABLE "connection" RENAME COLUMN "providerId" TO "provider"`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD CONSTRAINT "FK_d60a17c30480e9de74452583f2f" FOREIGN KEY ("connectionId") REFERENCES "connection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
