import { Kysely, sql } from "kysely";
import { Database } from "..";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("organization")
    .addColumn("organizationId", "serial", (col) => col.primaryKey().unique())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("address", "varchar")
    .addColumn("addressComplement", "varchar")
    .addColumn("city", "varchar")
    .addColumn("postalCode", "varchar")
    .addColumn("country", "varchar")
    .addColumn("phoneNumber", "varchar")
    .addColumn("taxNumber", "varchar")
    .addColumn("website", "varchar")
    .addColumn("userOwnerId", "integer", (col) =>
      col.notNull().references("user.userId")
    )
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}
