import { Generated } from "kysely";

export interface UserEntity {
  userId: Generated<number>;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Generated<Date>;
  passwordHash: string;
  salt: string;
}
