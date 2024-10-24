import "server-only";

import { db, InsertUserRow, UserCompleteRow, UserRow } from "@database";

export async function insertUser(user: InsertUserRow): Promise<UserRow> {
  const insertedUser = await db
    .insertInto("user")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();

  return insertedUser;
}

export async function findUserByEmail(
  email: string
): Promise<UserCompleteRow | undefined> {
  const user = await db
    .selectFrom("user")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  return user;
}

export async function findUserById(
  userId: number
): Promise<UserRow | undefined> {
  const user = await db
    .selectFrom("user")
    .selectAll()
    .where("userId", "=", userId)
    .executeTakeFirst();

  return user;
}

export async function existsUserByEmail(email: string): Promise<boolean> {
  const user = await db
    .selectFrom("user")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  return !!user;
}
