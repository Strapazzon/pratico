import { Generated } from "kysely";

export interface OrganizationEntity {
  organizationId: Generated<number>;
  name: string;
  email: string;
  createdAt: Generated<Date>;
  address: string | null;
  addressComplement: string | null;
  addressNumber: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  phoneNumber: string | null;
  taxNumber: string;
  website: string | null;
  userOwnerId: number;
}
