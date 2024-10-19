import { Generated } from "kysely";

export interface InviteEntity {
  inviteId: Generated<string>;
  isUsed?: boolean;
  createdAt: Generated<Date>;
  userId?: number;
  usedAt?: Date;
}
