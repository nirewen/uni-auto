import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeSlugUnique1692386110268 implements MigrationInterface {
    name = 'MakeSlugUnique1692386110268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_503404f7e2e602815906fa62e5" ON "modules" ("slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_503404f7e2e602815906fa62e5"`);
    }

}
