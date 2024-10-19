import "server-only";
import { createKysely } from "@vercel/postgres-kysely";
import { CustomerEntity } from "@entities/customerEntity";
import { InviteEntity } from "@entities/inviteEntity";
import { OrganizationEntity } from "@entities/organizationEntity";
import { UserEntity } from "@entities/userEntity";

export * from "./operations";

export interface Database {
  user: UserEntity;
  customer: CustomerEntity;
  invite: InviteEntity;
  organization: OrganizationEntity;
}

export const db = createKysely<Database>();
