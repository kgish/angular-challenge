/* tslint:disable:max-line-length */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOperatorTable1545994173748 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "operator"`);
    await queryRunner.query(`CREATE TABLE "operator" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_7be1e05da3f612fbb2f4f138b7c" UNIQUE ("code"), CONSTRAINT "PK_8b950e1572745d9f69be7748ae8" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "operator"`);
  }

}
