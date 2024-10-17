"use server";

import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface UserTable {
  userId: Generated<string>;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  createdAt: Generated<Date>;
  passwordHash: string;
  salt: string;
}

export type UserRow = Selectable<UserTable>;
export type InsertableUserRow = Insertable<UserTable>;
export type UpdateableUserRow = Updateable<UserTable>;
