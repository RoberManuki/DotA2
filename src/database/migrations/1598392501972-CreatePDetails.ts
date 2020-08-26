import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePDetails1598392501972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pdetails',
        columns: [
          {
            name: 'match_id',
            type: 'decimal',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'hero_id',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'kills',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'deaths',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'assists',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'denies',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'damage',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'hero_damage',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'tower_damage',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'camps_stacked',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'gold',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'gold_per_min',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'xp_per_min',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'obs_placed',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'sen_placed',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'win',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'personaname',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  //= =========================================================================>

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pdetails');
  }
}
