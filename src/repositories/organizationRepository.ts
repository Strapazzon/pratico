import "server-only";
import {
  db,
  InsertOrganizationRow,
  OrganizationRow,
  UpdateOrganizationRow,
} from "@database";

export async function insertOrganization(
  organization: InsertOrganizationRow
): Promise<OrganizationRow> {
  console.log("organization", JSON.stringify(organization));
  const insertedOrganization = await db
    .insertInto("organization")
    .values(organization)
    .returningAll()
    .executeTakeFirstOrThrow();

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
