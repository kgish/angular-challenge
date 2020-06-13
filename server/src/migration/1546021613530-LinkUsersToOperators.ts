/* tslint:disable:max-line-length */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinkUsersToOperators1546021613530 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    const users = await queryRunner.query('SELECT * from "user"');
    const company = await queryRunner.query('SELECT * FROM "operator" where "code" = $1', ['COMPANY']);
    const admin = await queryRunner.query('SELECT * from "user" where "username" = $1', ['admin@company.nl']);
    const support = await queryRunner.query('SELECT * from "user" where "username" = $1', ['support@company.nl']);

    await queryRunner.query('UPDATE "user" SET "operatorId" = $2 WHERE "id" = $1', [admin.id, company[0].id]);
    await queryRunner.query('UPDATE "user" SET "operatorId" = $2 WHERE "id" = $1', [support.id, company[0].id]);

    users.forEach(async user => {
      // Select a random operator
      const operator = await queryRunner.query('SELECT * FROM "operator" ORDER BY RANDOM() LIMIT 1');
      // Link the user to this operator.
      await queryRunner.query('UPDATE "user" SET "operatorId" = $2 WHERE "id" = $1', [user.id, operator[0].id]);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('UPDATE "user" SET "operatorId" = null');
  }

}
