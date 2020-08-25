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
            isNullable: false,
          },
          {
            name: 'game_mode',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'radiant_score',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'dire_score',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'replay_url',
            type: 'varchar',
            isNullable: false,
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
