"use server";

import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface OrganizationTable {
  organizationId: Generated<number>;
  name: string;
  email: string;
  createdAt: Generated<Date>;
  address: string | null;
  addressComplement: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  phoneNumber: string | null;
  taxNumber: string;
  website: string | null;
  userOwnerId: number;
}

export type OrganizationRow = Selectable<OrganizationTable>;
export type InsertOrganizationRow = Insertable<OrganizationTable>;
export type UpdateOrganizationRow = Updateable<OrganizationTable>;
