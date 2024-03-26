import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteCascadeConnection1711418021471 implements MigrationInterface {
    name = 'DeleteCascadeConnection1711418021471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connection_module" DROP CONSTRAINT "FK_f10d4281afdcd5006dfa15f55f9"`);
        await queryRunner.query(`ALTER TABLE "connection_profile" DROP CONSTRAINT "FK_bbf8615049cd7ce5b3b7d6a99e2"`);
        await queryRunner.query(`ALTER TABLE "queue" DROP CONSTRAINT "FK_527f0feb0b0cfaff3a3dd3439d9"`);
        await queryRunner.query(`ALTER TABLE "connection_module" ADD CONSTRAINT "FK_f10d4281afdcd5006dfa15f55f9" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection_profile" ADD CONSTRAINT "FK_bbf8615049cd7ce5b3b7d6a99e2" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "queue" ADD CONSTRAINT "FK_527f0feb0b0cfaff3a3dd3439d9" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queue" DROP CONSTRAINT "FK_527f0feb0b0cfaff3a3dd3439d9"`);
        await queryRunner.query(`ALTER TABLE "connection_profile" DROP CONSTRAINT "FK_bbf8615049cd7ce5b3b7d6a99e2"`);
        await queryRunner.query(`ALTER TABLE "connection_module" DROP CONSTRAINT "FK_f10d4281afdcd5006dfa15f55f9"`);
        await queryRunner.query(`ALTER TABLE "queue" ADD CONSTRAINT "FK_527f0feb0b0cfaff3a3dd3439d9" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection_profile" ADD CONSTRAINT "FK_bbf8615049cd7ce5b3b7d6a99e2" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection_module" ADD CONSTRAINT "FK_f10d4281afdcd5006dfa15f55f9" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
