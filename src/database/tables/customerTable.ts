"use server";

import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface CustomerTable {
  customerId: Generated<number>;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Generated<Date>;
  address: string | null;
  addressComplement: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  phoneNumber: string | null;
  birthDate: Date;
  taxNumber: string;
  notes: string | null;
}

export type CustomerRow = Selectable<CustomerTable>;
export type InsertCustomerRow = Insertable<CustomerTable>;
export type UpdateCustomerRow = Updateable<CustomerTable>;
