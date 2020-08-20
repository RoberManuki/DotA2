import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMatches1597772400750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'matches',
        columns: [
          {
            name: 'match_id',
            type: 'decimal',
            isPrimary: true,
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
