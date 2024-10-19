"use server";

import { Generated, Selectable, Updateable } from "kysely";

export interface InviteTable {
  inviteId: Generated<string>;
  isUsed?: boolean;
  createdAt: Generated<Date>;
  userId?: number;
  usedAt?: Date;
}

export type InviteRow = Selectable<InviteTable>;
export type UpdateInviteRow = Updateable<InviteTable>;
