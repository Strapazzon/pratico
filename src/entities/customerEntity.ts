import { Generated } from "kysely";

export interface CustomerEntity {
  customerId: Generated<number>;
  organizationId: number;
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
