import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAddresses1627508510953 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "addresses",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "zipcode",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "street",
                        type: "varchar",
                    },
                    {
                        name: "streetNumber",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "number",
                        type: "varchar",
                    },
                    {
                        name: "building",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "floor",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "type",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "neighborhood",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "county",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "state",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "country",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                  {
                    columnNames: ["userId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    name: "fk_user_addresses",
                    onDelete: "RESTRICT",
                    onUpdate: "CASCADE",
                  },
                ],
            })
        )
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("addresses", 'fk_user_addresses')
        await queryRunner.dropTable("addresses");
    }

}
