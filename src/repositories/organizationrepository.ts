import { db } from "@database/index";
import {
  InsertOrganizationRow,
  OrganizationRow,
} from "@database/tables/organizationTable";

export async function insertOrganization(
  organization: InsertOrganizationRow
): Promise<OrganizationRow> {
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
