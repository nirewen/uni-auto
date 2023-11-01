import { MigrationInterface, QueryRunner } from 'typeorm'

export class BaseData1698845004253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO providers (name, slug, enabled) VALUES ('UFSM', 'ufsm', true) ON CONFLICT DO NOTHING`
    )
    await queryRunner.query(
      `INSERT INTO modules (name, slug, enabled) VALUES ('RU Automático', 'auto-ru', true) ON CONFLICT DO NOTHING`
    )
    await queryRunner.query(
      `INSERT INTO module_settings (settings, enabled, "providerId", "moduleId") VALUES ('{"cron": "0 9 * * 0,2"}'::jsonb, true, (SELECT id FROM providers WHERE slug = 'ufsm'), (SELECT id FROM modules WHERE slug = 'auto-ru')) ON CONFLICT DO NOTHING`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM module_settings WHERE "moduleId" = (SELECT id FROM modules WHERE slug = 'auto-ru')`
    )
    await queryRunner.query(`DELETE FROM modules WHERE slug = 'auto-ru'`)
    await queryRunner.query(`DELETE FROM providers WHERE slug = 'ufsm'`)
  }
}
