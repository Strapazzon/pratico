import "server-only";
import { Insertable, Selectable, Updateable } from "kysely";
import { CustomerEntity } from "@entities/customerEntity";
import { InviteEntity } from "@entities/inviteEntity";
import { OrganizationEntity } from "@entities/organizationEntity";
import { UserEntity } from "@entities/userEntity";
import { AnamnesisModelEntity } from "@entities/anamnesisModelEntity";

// User operations
export type UserRow = Selectable<UserEntity>;
export type InsertUserRow = Insertable<UserEntity>;
export type UpdateUserRow = Updateable<UserEntity>;

// Customer operations
export type CustomerRow = Selectable<CustomerEntity>;
export type InsertCustomerRow = Insertable<CustomerEntity>;
export type UpdateCustomerRow = Updateable<CustomerEntity>;

// Invite operations
export type InviteRow = Selectable<InviteEntity>;
export type UpdateInviteRow = Updateable<InviteEntity>;

// Organization operations
export type OrganizationRow = Selectable<OrganizationEntity>;
export type InsertOrganizationRow = Insertable<OrganizationEntity>;
export type UpdateOrganizationRow = Updateable<OrganizationEntity>;

// AnamnesisModel operations
export type AnamnesisModelRow = Selectable<AnamnesisModelEntity>;
export type InsertAnamnesisModelRow = Insertable<AnamnesisModelEntity>;
export type UpdateAnamnesisModelRow = Updateable<AnamnesisModelEntity>;
