import { Kysely, sql } from "kysely";
import { Database } from "..";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("customer")
    .addColumn("customerId", "serial", (col) => col.primaryKey().unique())
    .addColumn("organizationId", "integer", (col) =>
      col.notNull().references("organization.organizationId")
    )
    .addColumn("firstName", "varchar", (col) => col.notNull())
    .addColumn("lastName", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull())
    .addColumn("address", "varchar")
    .addColumn("addressComplement", "varchar")
    .addColumn("city", "varchar")
    .addColumn("postalCode", "varchar")
    .addColumn("country", "varchar")
    .addColumn("phoneNumber", "varchar")
    .addColumn("birthDate", "varchar", (col) => col.notNull())
    .addColumn("taxNumber", "varchar", (col) => col.notNull().unique())
    .addColumn("notes", "text")
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )

    .execute();
}
