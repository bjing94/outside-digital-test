import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1659465058430 implements MigrationInterface {
    name = 'migrations1659465058430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blacklist" ("token" text NOT NULL, CONSTRAINT "PK_491806708ff1601fd3ccb2e4101" PRIMARY KEY ("token"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "sortOrder" integer NOT NULL DEFAULT '0', "creatorUid" uuid, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userUid" uuid, "tagId" integer, CONSTRAINT "PK_ca37acfc991123d4cba963e75bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "nickname" character varying(30) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"), CONSTRAINT "PK_6e20ce1edf0678a09f1963f9587" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_1d9e7c347d02fb20f42d68a23cf" FOREIGN KEY ("creatorUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tag" ADD CONSTRAINT "FK_cfc5043afb05e839524af0d4cc2" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tag" ADD CONSTRAINT "FK_d1c8261be4e02dc1df64636250c" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tag" DROP CONSTRAINT "FK_d1c8261be4e02dc1df64636250c"`);
        await queryRunner.query(`ALTER TABLE "user_tag" DROP CONSTRAINT "FK_cfc5043afb05e839524af0d4cc2"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_1d9e7c347d02fb20f42d68a23cf"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "blacklist"`);
    }

}
