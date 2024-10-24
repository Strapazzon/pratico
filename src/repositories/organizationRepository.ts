import "server-only";
import {
  db,
  InsertOrganizationRow,
  OrganizationRow,
  UpdateOrganizationRow,
} from "@database";
import { UserRoleRow } from "src/types/user";

export async function insertOrganization(
  organization: InsertOrganizationRow
): Promise<OrganizationRow> {
  const insertedOrganization = await db
    .insertInto("organization")
    .values(organization)
    .returningAll()
    .executeTakeFirstOrThrow();

  await db
    .insertInto("organization_user_role")
    .values({
      organizationId: insertedOrganization.organizationId,
      userId: insertedOrganization.userOwnerId,
      role: "admin",
      createdAt: new Date(),
    })
    .execute();

  return insertedOrganization;
}

export async function findOrganizationById(
  organizationId: number
): Promise<OrganizationRow | undefined> {
  const organization = await db
    .selectFrom("organization")
    .selectAll()
    .where("organizationId", "=", organizationId)
    .executeTakeFirst();

  return organization;
}

export async function findOrganizationByIdAndUserOwnerId(
  organizationId: number,
  userOwnerId: number
): Promise<OrganizationRow | undefined> {
  const organization = await db
    .selectFrom("organization")
    .selectAll()
    .where("organizationId", "=", organizationId)
    .where("userOwnerId", "=", userOwnerId)
    .executeTakeFirst();

  return organization;
}

export async function listOrganizationsByUserOwnerId(
  userOwnerId: number
): Promise<OrganizationRow[]> {
  const organizations = await db
    .selectFrom("organization")
    .selectAll()
    .where("userOwnerId", "=", userOwnerId)
    .execute();

  return organizations;
}

export async function updateOrganizationIfUserIsOwner(
  organizationId: number,
  userOwnerId: number,
  organization: UpdateOrganizationRow
): Promise<OrganizationRow> {
  const updatedOrganization = await db
    .updateTable("organization")
    .set(organization)
    .where("organizationId", "=", organizationId)
    .where("userOwnerId", "=", userOwnerId)
    .returningAll()
    .executeTakeFirstOrThrow();

  return updatedOrganization;
}

export async function listOrganizationsByUserId(
  userId: number
): Promise<OrganizationRow[]> {
  const organizations = await db
    .selectFrom("organization")
    .selectAll("organization")
    .innerJoin(
      "organization_user_role",
      "organization.organizationId",
      "organization_user_role.organizationId"
    )
    .where("userId", "=", userId)
    .execute();

  return organizations;
}

export async function listUsersByOrganizationId(
  organizationId: number
): Promise<UserRoleRow[]> {
  const users = await db
    .selectFrom("organization_user_role")
    .select("role")
    .innerJoin("user", "user.userId", "organization_user_role.userId")
    .select("user.userId")
    .select("user.email")
    .select("user.firstName")
    .select("user.lastName")
    .select("user.createdAt")
    .where("organizationId", "=", organizationId)
    .distinct()
    .execute();

  return users;
}

export async function addUserToOrganization(
  organizationId: number,
  userId: number,
  role: UserRoleRow
): Promise<void> {
  await db
    .insertInto("organization_user_role")
    .values({
      organizationId,
      userId,
      role: role.role,
      createdAt: new Date(),
    })
    .execute();
}

export async function removeUserFromOrganization(
  organizationId: number,
  userId: number
): Promise<void> {
  await db
    .deleteFrom("organization_user_role")
    .where("organizationId", "=", organizationId)
    .where("userId", "=", userId)
    .execute();
}

export async function updateOrganizationUserRole(
  organizationId: number,
  userId: number,
  role: UserRoleRow
): Promise<void> {
  await db
    .updateTable("organization_user_role")
    .set({ role: role.role })
    .where("organizationId", "=", organizationId)
    .where("userId", "=", userId)
    .execute();
}
