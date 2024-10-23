import "server-only";
import { AnamnesisModelRow, db, InsertAnamnesisModelRow } from "@database";

export async function insertAnamnesisModel(
  data: InsertAnamnesisModelRow
): Promise<AnamnesisModelRow> {
  const questionsJson = JSON.stringify(data.questions);

  const insertedAnamnesis = await db
    .insertInto("anamnesisModel")
    .values({
      ...data,
      questions: questionsJson,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return insertedAnamnesis;
}

export async function findAnamnesisModelByIdAndOrganizationId(
  id: number,
  organizationIds: number[]
): Promise<AnamnesisModelRow | undefined> {
  const anamnesisModel = await db
    .selectFrom("anamnesisModel")
    .selectAll()
    .where("anamnesisModelId", "=", id)
    .where("organizationId", "in", organizationIds)
    .executeTakeFirst();

  return anamnesisModel;
}

export async function listAnamnesisModelsByOrganizationId(
  organizationId: number,
  page = 1,
  perPage = 10
) {
  const offset = (page - 1) * perPage;

  const anamnesisModels = await db
    .selectFrom("anamnesisModel")
    .selectAll()
    .limit(perPage)
    .offset(offset)
    .where("organizationId", "=", organizationId)
    .execute();

  const rowCount = await db
    .selectFrom("anamnesisModel")
    .select(db.fn.count<number>("anamnesisModelId").as("count"))
    .where("organizationId", "=", organizationId)
    .executeTakeFirstOrThrow();

  const totalPages = Math.ceil(rowCount.count / perPage);

  return { rowCount: rowCount.count, anamnesisModels, totalPages };
}

export async function updateAnamnesisModel(
  id: number,
  organizationIds: number[],
  data: Partial<InsertAnamnesisModelRow>
): Promise<AnamnesisModelRow> {
  const questionsJson = JSON.stringify(data.questions);
  const newData = {
    ...data,
    questions: questionsJson,
    updatedAt: new Date(),
    id: undefined,
  };

  const updatedAnamnesis = await db
    .updateTable("anamnesisModel")
    .set(newData)
    .where("anamnesisModelId", "=", id)
    .where("organizationId", "in", organizationIds)
    .returningAll()
    .executeTakeFirstOrThrow();

  return updatedAnamnesis;
}
