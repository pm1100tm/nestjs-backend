import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715327409783 implements MigrationInterface {
  name = 'Migration1715327409783';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "firstname" character varying(16) NOT NULL DEFAULT '', "lastname" character varying(16) NOT NULL DEFAULT '', "nickname" character varying(32) NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "REL_11d81cd7be87b6f8865b0cf766" UNIQUE ("user_id"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(64) NOT NULL, "password" character varying(128) NOT NULL DEFAULT '', "role" character varying(2) NOT NULL DEFAULT 'cu', "sign_in_provider" character varying(8) NOT NULL DEFAULT 'email', "refresh_token" character varying NOT NULL DEFAULT '', "is_removed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_11d81cd7be87b6f8865b0cf7661" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_11d81cd7be87b6f8865b0cf7661"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
