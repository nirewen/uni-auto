import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeQueueIdToUuid1693158965395 implements MigrationInterface {
    name = 'ChangeQueueIdToUuid1693158965395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queue" DROP CONSTRAINT "PK_4adefbd9c73b3f9a49985a5529f"`);
        await queryRunner.query(`ALTER TABLE "queue" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "queue" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "queue" ADD CONSTRAINT "PK_4adefbd9c73b3f9a49985a5529f" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queue" DROP CONSTRAINT "PK_4adefbd9c73b3f9a49985a5529f"`);
        await queryRunner.query(`ALTER TABLE "queue" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "queue" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "queue" ADD CONSTRAINT "PK_4adefbd9c73b3f9a49985a5529f" PRIMARY KEY ("id")`);
    }

}
