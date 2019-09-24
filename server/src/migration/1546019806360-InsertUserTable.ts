import {MigrationInterface, QueryRunner} from 'typeorm';

import * as faker from 'faker';
import {hash} from 'bcryptjs';

export class InsertUserTable1546019806360 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    let username = 'admin@coin.nl';
    let name = 'Bender Rodriguez';
    let password = await hash('admin', 10);
    await queryRunner.query(`INSERT INTO "user" (username, name, password, role) VALUES ($1, $2, $3, $4)`, [username, name, password, 'admin']);
    username = 'support@coin.nl';
    name = 'Philip J. Fry';
    password = await hash('support', 10);
    await queryRunner.query(`INSERT INTO "user" (username, name, password, role) VALUES ($1, $2, $3, $4)`, [username, name, password, 'support']);
    for (let i = 0; i < 300; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      name = firstName + ' ' + lastName;
      username = faker.internet.email(firstName, lastName);
      password = await hash(username, 10);
      await queryRunner.query(`INSERT INTO "user" (username, name, password, role) VALUES ($1, $2, $3, $4)`, [username, name, password, 'user']);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('DELETE FROM "user"');
  }
}
