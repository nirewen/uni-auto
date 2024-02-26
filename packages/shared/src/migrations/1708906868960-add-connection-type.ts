import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConnectionType1708906868960 implements MigrationInterface {
    name = 'AddConnectionType1708906868960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."connections_type_enum" AS ENUM('STANDARD', 'LEGACY')`);
        await queryRunner.query(`ALTER TABLE "connections" ADD "type" "public"."connections_type_enum" NOT NULL DEFAULT 'STANDARD'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connections" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."connections_type_enum"`);
    }

}
