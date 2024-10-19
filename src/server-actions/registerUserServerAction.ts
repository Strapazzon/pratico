"use server";

import { redirect } from "@i18n/routing";
import { generateHashSha512, generateSalt } from "@lib/auth/cryptographic";
import { jwtGenerateRefreshToken, jwtGenerateToken } from "@lib/auth/jwt";
import { setAuthCookies } from "@lib/auth/setAuthCookies";
import {
  burnInviteCode,
  inviteCodeIsValid,
} from "@repositories/inviteRepository";
import { existsUserByEmail, insertUser } from "@repositories/userRepository";
import { RegisterUserServerActionResponse, UserRegister } from "@types";

export async function registerUserServerAction(
  userData: UserRegister
): Promise<RegisterUserServerActionResponse> {
  const { firstName, lastName, email, password } = userData;

  if (password !== userData.confirmPassword) {
    return {
      error: "passwordsDoNotMatch",
    };
  }

  const existUser = await existsUserByEmail(email);

  if (existUser) {
    return {
      error: "emailAlreadyExists",
    };
  }

  const validInviteCode = await inviteCodeIsValid(userData.inviteCode);

  if (!validInviteCode) {
    return {
      error: "invalidInviteCode",
    };
  }

  const salt = generateSalt();
  const passwordHash = generateHashSha512(password, salt);

  const user = await insertUser({
    firstName,
    lastName,
    email,
    salt,
    passwordHash,
  });

  await burnInviteCode(userData.inviteCode, user.userId);

  const token = await jwtGenerateToken({
    id: user.userId,
    email,
    firstName,
    lastName,
    organizations: [],
  });

  const refreshToken = await jwtGenerateRefreshToken({
    id: user.userId,
    type: "refresh",
  });

  setAuthCookies(token, refreshToken);

  return redirect(`/dashboard`);
}
