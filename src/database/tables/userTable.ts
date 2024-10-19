"use server";

import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface UserTable {
  userId: Generated<number>;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Generated<Date>;
  passwordHash: string;
  salt: string;
}

export type UserRow = Selectable<UserTable>;
export type InsertUserRow = Insertable<UserTable>;
export type UpdateUserRow = Updateable<UserTable>;
