import "server-only";

import { db } from "@database";

export async function burnInviteCode(
  inviteCode: string,
  userId: number
): Promise<void> {
  await db
    .updateTable("invite")
    .set({ userId, usedAt: new Date() })
    .where("inviteId", "=", inviteCode)
    .execute();
}

export async function inviteCodeIsValid(inviteCode: string): Promise<boolean> {
  const invite = await db
    .selectFrom("invite")
    .selectAll()
    .where("inviteId", "=", inviteCode)
    .where("isUsed", "=", false)
    .where("usedAt", "is", null)
    .executeTakeFirst();

  console.log("Invite validation => ", inviteCode, JSON.stringify(invite));

  return !!invite;
}
