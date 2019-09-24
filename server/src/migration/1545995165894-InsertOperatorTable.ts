import { MigrationInterface, QueryRunner } from 'typeorm';

import { IOperator, Operators } from './data/operators.data';

export class InsertOperatorTable1545995165894 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DELETE FROM "operator"');
    await queryRunner.query(`INSERT INTO "operator" (code, name) VALUES ($1, $2)`, ['COIN', 'Vereniging COIN']);
    Operators.forEach((operator: IOperator) => {
      operator.contract.forEach(async contract => {
        await queryRunner.query(`INSERT INTO "operator" (code, name) VALUES ($1, $2)`, [contract, operator.name]);
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('DELETE FROM "operator"');
  }

}
