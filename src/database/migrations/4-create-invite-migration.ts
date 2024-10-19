import { Kysely, sql } from "kysely";
import { Database } from "..";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("invite")
    .addColumn("inviteId", "varchar", (col) =>
      col
        .primaryKey()
        .unique()
        .defaultTo(sql`upper(substring(md5(random()::text), 1, 6))`)
    )
    .addColumn("isUsed", "varchar")
    .addColumn("userId", "integer", (col) => col.references("user.userId"))
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("usedAt", "timestamp")
    .execute();

  // Insert some invites
  for (let i = 0; i < 20; i++) {
    await db
      .insertInto("invite")
      .values({
        isUsed: false,
      })
      .execute();
  }
}
