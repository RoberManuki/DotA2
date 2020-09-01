import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMatches1598380264484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'matches',
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
            name: 'duration',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'game_mode',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'radiant_score',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'dire_score',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'replay_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'kills',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'deaths',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'assists',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'denies',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'hero_damage',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'tower_damage',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'camps_stacked',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'lane_role',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'gold',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'gold_per_min',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'xp_per_min',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'obs_placed',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'sen_placed',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'win',
            type: 'decimal',
            isNullable: true,
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
    await queryRunner.dropTable('matches');
  }
}
