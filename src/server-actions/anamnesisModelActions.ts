"use server";
import { InsertAnamnesisModelRow } from "@database";
import { AnamnesisModelEntity } from "@entities/anamnesisModelEntity";
import { getUserDataFromSession } from "@lib/auth/getUserDataFromSession";
import {
  findAnamnesisModelByIdAndOrganizationId,
  insertAnamnesisModel,
  listAnamnesisModelsByOrganizationIds,
  updateAnamnesisModel,
} from "@repositories/anamnesisModelRepository";

export async function getAnamnesisModelsAction() {
  const { organizations } = await getUserDataFromSession();
  const anamnesisModels = (await listAnamnesisModelsByOrganizationIds(
    organizations
  )) as unknown as AnamnesisModelEntity[];

  return anamnesisModels;
}

export async function getAnamnesisModelAction(anamnesisModelId: number) {
  const { organizations } = await getUserDataFromSession();
  const anamnesisModel = await findAnamnesisModelByIdAndOrganizationId(
    anamnesisModelId,
    organizations
  );

  return anamnesisModel;
}

export async function addAnamnesisModelAction(data: AnamnesisModelEntity) {
  const { organizations } = await getUserDataFromSession();

  const insertedAnamnesis = await insertAnamnesisModel({
    ...data,
    anamnesisModelId: undefined,
    organizationId: organizations[0],
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
