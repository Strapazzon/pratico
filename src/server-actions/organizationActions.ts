"use server";

import {
  InsertOrganizationRow,
  OrganizationRow,
  UpdateOrganizationRow,
} from "@database";
import { OrganizationEntity } from "@entities/organizationEntity";
import { getUserDataFromSession } from "@server-actions/getUserDataFromSessionAction";
import {
  findOrganizationByIdAndUserOwnerId,
  insertOrganization,
  listOrganizationsByUserId,
  updateOrganizationIfUserIsOwner,
} from "@repositories/organizationRepository";

export async function newOrganizationAction(
  organization: OrganizationEntity
): Promise<OrganizationRow> {
  const { id } = await getUserDataFromSession();

  return await insertOrganization({
    ...organization,
    organizationId: undefined,
    createdAt: undefined,
    userOwnerId: id,
  } as unknown as InsertOrganizationRow);
}

export async function findOrganizationByIdAction(
  organizationId: number
): Promise<OrganizationRow | undefined> {
  const { id } = await getUserDataFromSession();
  return await findOrganizationByIdAndUserOwnerId(organizationId, id);
}

export async function updateOrganizationAction(
  organizationId: number,
  organization: OrganizationEntity
): Promise<OrganizationRow> {
  const { id } = await getUserDataFromSession();

  return await updateOrganizationIfUserIsOwner(
    organizationId,
    id,
    organization as unknown as UpdateOrganizationRow
  );
}

export async function listOrganizationsByUserIdAction(): Promise<
  OrganizationEntity[]
> {
  const { id } = await getUserDataFromSession();

  const organization = await listOrganizationsByUserId(id);

  return organization as unknown as OrganizationEntity[];
}
