import "server-only";
import { Insertable, Selectable, Updateable } from "kysely";
import { CustomerEntity } from "@entities/customerEntity";
import { InviteEntity } from "@entities/inviteEntity";
import { OrganizationEntity } from "@entities/organizationEntity";
import { UserEntity } from "@entities/userEntity";
import { AnamnesisModelEntity } from "@entities/anamnesisModelEntity";
import { OrganizationUserRoleEntity } from "@entities/organizationUserRoleEntity";

// User operations
/**
 * User entity with all fields.
 * Use only for operations that require all fields.
 */
export type UserCompleteRow = Selectable<UserEntity>;
export type UserRow = Selectable<
  Omit<UserEntity, "passwordHash" | "salt" | "createdAt">
>;
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

// OrganizationUserRole operations
export type OrganizationUserRoleRow = Selectable<OrganizationUserRoleEntity>;
export type InsertOrganizationUserRoleRow =
  Insertable<OrganizationUserRoleEntity>;
export type UpdateOrganizationUserRoleRow =
  Updateable<OrganizationUserRoleEntity>;
