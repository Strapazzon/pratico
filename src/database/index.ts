import { createKysely } from "@vercel/postgres-kysely";
import { UserTable } from "./tables/userTable";

export interface Database {
  user: UserTable;
}

export const db = createKysely<Database>();
