"use server";

import { db } from "@database/index";
import { InsertableUserRow, UserRow } from "@database/tables/userTable";

export async function insertUser(user: InsertableUserRow): Promise<UserRow> {
  const insertedUser = await db
    .insertInto("user")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();

  return insertedUser;
}

export async function findUserByEmail(
  email: string
): Promise<UserRow | undefined> {
  const user = await db
    .selectFrom("user")
    .where("email", "=", email)
    .selectAll("user")
    .executeTakeFirst();

  return user;
}

export async function findUserById(
  userId: string
): Promise<UserRow | undefined> {
  const user = await db
    .selectFrom("user")
    .where("userId", "=", userId)
    .selectAll("user")
    .executeTakeFirst();

  return user;
}

export async function existsUserByEmail(email: string): Promise<boolean> {
  const user = await db
    .selectFrom("user")
    .where("email", "=", email)
    .selectAll("user")
    .executeTakeFirst();

  return !!user;
}
