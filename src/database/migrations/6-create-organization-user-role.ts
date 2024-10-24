import { Kysely, sql } from "kysely";
import { Database } from "..";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("organization_user_role")
    .addColumn("organizationId", "integer", (col) =>
      col.notNull().references("organization.organizationId")
    )
    .addColumn("userId", "integer", (col) =>
      col.notNull().references("user.userId")
    )
    .addColumn("role", "varchar", (col) => col.notNull())
    .addCheckConstraint(
      "organization_user_role_role_check",
      sql`role = 'admin' or role = 'write' or role = 'readonly'`
    )
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addPrimaryKeyConstraint("organization_user_role_pk", [
      "organizationId",
      "userId",
    ])
    .execute();
}
