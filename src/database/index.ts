import "server-only";
import { createKysely } from "@vercel/postgres-kysely";
import { CustomerEntity } from "@entities/customerEntity";
import { InviteEntity } from "@entities/inviteEntity";
import { OrganizationEntity } from "@entities/organizationEntity";
import { UserEntity } from "@entities/userEntity";
import { AnamnesisModelEntity } from "@entities/anamnesisModelEntity";

export * from "./operations";

export interface Database {
  user: UserEntity;
  customer: CustomerEntity;
  invite: InviteEntity;
  organization: OrganizationEntity;
  anamnesisModel: AnamnesisModelEntity;
}

export const db = createKysely<Database>();
