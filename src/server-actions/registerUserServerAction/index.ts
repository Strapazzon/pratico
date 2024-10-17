"use server";

import { generateHashSha512, generateSalt } from "@lib/auth/cryptographic";
import { jwtGenerateRefreshToken, jwtGenerateToken } from "@lib/auth/jwt";
import { existsUserByEmail, insertUser } from "@repositories/userRepository";
import { RegisterUserServerActionResponse, UserRegister } from "@types";

export async function registerUserServerAction(
  userData: UserRegister
): Promise<RegisterUserServerActionResponse> {
  const { firstName, lastName, email, password } = userData;

  if (password !== userData.confirmPassword) {
    return {
      success: false,
      error: "passwordsDoNotMatch",
    };
  }

  const existUser = await existsUserByEmail(email);

  if (existUser) {
    return {
      success: false,
      error: "emailAlreadyExists",
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

  const token = await jwtGenerateToken({
    id: user.userId,
    email,
  });

  const refreshToken = await jwtGenerateRefreshToken({
    id: user.userId,
    type: "refresh",
  });

  return {
    success: true,
    token,
    refreshToken,
  };
}
