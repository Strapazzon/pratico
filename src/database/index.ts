import { createKysely } from "@vercel/postgres-kysely";
import { UserTable } from "./tables/userTable";
import { CustomerTable } from "./tables/customerTable";
import { OrganizationTable } from "./tables/organizationTable";
import { InviteTable } from "./tables/inviteTable";

export interface Database {
  user: UserTable;
  customer: CustomerTable;
  organization: OrganizationTable;
  invite: InviteTable;
}

export type DatabaseTable = keyof Database;

export const db = createKysely<Database>();
