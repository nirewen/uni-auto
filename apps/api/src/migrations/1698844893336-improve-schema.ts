import { MigrationInterface, QueryRunner } from 'typeorm'

export class ImproveSchema1698844893336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "provider"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "connection"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
