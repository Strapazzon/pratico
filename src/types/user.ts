import { UserRow } from "@database";

export type UserRole = "admin" | "write" | "readonly";

export interface UserRoleRow extends UserRow {
  role: UserRole;
}
