import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1658643285118 implements MigrationInterface {
    name = 'initial1658643285118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` bigint NOT NULL AUTO_INCREMENT, \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`user_name\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
