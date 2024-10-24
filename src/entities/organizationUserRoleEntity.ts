import { UserRole } from "src/types/user";

export interface OrganizationUserRoleEntity {
  organizationId: number;
  userId: number;
  role: UserRole;
  createdAt: Date;
}
