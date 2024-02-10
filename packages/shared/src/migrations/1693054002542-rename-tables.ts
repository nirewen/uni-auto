import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTables1693054002542 implements MigrationInterface {
    name = 'RenameTables1693054002542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connection_module" DROP CONSTRAINT "FK_f10d4281afdcd5006dfa15f55f9"`);
        await queryRunner.query(`ALTER TABLE "module_settings" DROP CONSTRAINT "FK_116c1d15a4259346652694ed88d"`);
        await queryRunner.query(`CREATE TABLE "providers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "enabled" boolean NOT NULL, "connectionsId" uuid, CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "connections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identifier" character varying NOT NULL, "token" character varying NOT NULL, "providerId" uuid, "userId" uuid, CONSTRAINT "PK_0a1f844af3122354cbd487a8d03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "providers" ADD CONSTRAINT "FK_479b4a0a1885cfb7a73e4cfa00a" FOREIGN KEY ("connectionsId") REFERENCES "connections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connections" ADD CONSTRAINT "FK_f25277009ad5b3959cf66b5eef3" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connections" ADD CONSTRAINT "FK_c8ee0b9afe383566cbe9243a09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection_module" ADD CONSTRAINT "FK_f10d4281afdcd5006dfa15f55f9" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD CONSTRAINT "FK_116c1d15a4259346652694ed88d" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "module_settings" DROP CONSTRAINT "FK_116c1d15a4259346652694ed88d"`);
        await queryRunner.query(`ALTER TABLE "connection_module" DROP CONSTRAINT "FK_f10d4281afdcd5006dfa15f55f9"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP CONSTRAINT "FK_c8ee0b9afe383566cbe9243a09f"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP CONSTRAINT "FK_f25277009ad5b3959cf66b5eef3"`);
        await queryRunner.query(`ALTER TABLE "providers" DROP CONSTRAINT "FK_479b4a0a1885cfb7a73e4cfa00a"`);
        await queryRunner.query(`DROP TABLE "connections"`);
        await queryRunner.query(`DROP TABLE "providers"`);
        await queryRunner.query(`ALTER TABLE "module_settings" ADD CONSTRAINT "FK_116c1d15a4259346652694ed88d" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection_module" ADD CONSTRAINT "FK_f10d4281afdcd5006dfa15f55f9" FOREIGN KEY ("connectionId") REFERENCES "connection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
