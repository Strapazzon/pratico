import { Kysely, sql } from "kysely";
import { Database } from "..";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("anamnesisModel")
    .addColumn("anamnesisModelId", "serial", (col) => col.primaryKey().unique())
    .addColumn("organizationId", "integer", (col) =>
      col.notNull().references("organization.organizationId")
    )
    .addColumn("title", "varchar", (col) => col.notNull())
    .addColumn("status", "varchar", (col) => col.notNull())
    .addCheckConstraint("status", sql`status IN ('active', 'archived')`)
    .addColumn("description", "text")
    .addColumn("questions", "jsonb")
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updatedAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.executeQuery;

  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`.execute(db);

  await db.schema
    .createTable("anamnesis")
    .addColumn("anamnesisId", "varchar", (col) =>
      col
        .primaryKey()
        .unique()
        .defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("organizationId", "integer", (col) =>
      col.notNull().references("organization.organizationId")
    )
    .addColumn("customerId", "integer", (col) =>
      col.notNull().references("customer.customerId")
    )
    .addColumn("anamnesisModelId", "integer", (col) =>
      col.notNull().references("anamnesisModel.anamnesisModelId")
    )
    .addColumn("answers", "jsonb")
    .addColumn("status", "varchar", (col) => col.notNull())

    .addCheckConstraint(
      "status",
      sql`status IN ('created', 'inProgress', 'signed')`
    )
    .addColumn("signedAt", "varchar")

    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updatedAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}
