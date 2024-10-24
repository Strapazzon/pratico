"use server";
import { InsertAnamnesisModelRow } from "@database";
import { AnamnesisModelEntity } from "@entities/anamnesisModelEntity";
import { getUserDataFromSession } from "@server-actions/getUserDataFromSessionAction";
import {
  findAnamnesisModelByIdAndOrganizationId,
  insertAnamnesisModel,
  listAnamnesisModelsByOrganizationId,
  updateAnamnesisModel,
} from "@repositories/anamnesisModelRepository";
import { validateUserOrganizationRights } from "@lib/auth/validateUserOrganizationRights";

export async function getAnamnesisModelsAction(
  page = 1,
  perPage = 10,
  organizationId: number
) {
  validateUserOrganizationRights(organizationId);
  const anamnesisModels = await listAnamnesisModelsByOrganizationId(
    organizationId,
    page,
    perPage
  );

  return anamnesisModels;
}

export async function getAnamnesisModelAction(
  anamnesisModelId: number,
  organizationId: number
) {
  validateUserOrganizationRights(organizationId);

  const anamnesisModel = await findAnamnesisModelByIdAndOrganizationId(
    anamnesisModelId,
    organizationId
  );

  return anamnesisModel;
}

export async function addAnamnesisModelAction(
  data: AnamnesisModelEntity,
  organizationId: number
) {
  validateUserOrganizationRights(organizationId);

  const insertedAnamnesis = await insertAnamnesisModel({
    ...data,
    anamnesisModelId: undefined,
    organizationId,
    status: "active",
  } as unknown as InsertAnamnesisModelRow);

  return insertedAnamnesis;
}

export async function updateAnamnesisModelAction(
  anamnesisModelId: number,
  data: AnamnesisModelEntity
) {
  const { organizations } = await getUserDataFromSession();
  const updatedAnamnesis = await updateAnamnesisModel(
    anamnesisModelId,
    organizations,
    {
      ...data,
      organizationId: undefined,
    } as unknown as InsertAnamnesisModelRow
  );

  return updatedAnamnesis;
}
