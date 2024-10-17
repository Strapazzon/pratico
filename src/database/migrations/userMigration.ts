import { Kysely, sql } from "kysely";
import { Database } from "..";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("user")
    .addColumn("userID", "serial", (col) => col.primaryKey().unique())
    .addColumn("firstName", "varchar", (col) => col.notNull())
    .addColumn("lastName", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull())
    .addColumn("salt", "varchar", (col) => col.notNull())
    .addColumn("passwordHash", "varchar", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}
