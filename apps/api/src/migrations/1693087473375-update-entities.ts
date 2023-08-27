import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1693087473375 implements MigrationInterface {
    name = 'UpdateEntities1693087473375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "providers" DROP CONSTRAINT "FK_479b4a0a1885cfb7a73e4cfa00a"`);
        await queryRunner.query(`ALTER TABLE "providers" DROP COLUMN "connectionsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "providers" ADD "connectionsId" uuid`);
        await queryRunner.query(`ALTER TABLE "providers" ADD CONSTRAINT "FK_479b4a0a1885cfb7a73e4cfa00a" FOREIGN KEY ("connectionsId") REFERENCES "connections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
