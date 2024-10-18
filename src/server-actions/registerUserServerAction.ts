"use server";

import { redirect } from "@i18n/routing";
import { generateHashSha512, generateSalt } from "@lib/auth/cryptographic";
import { jwtGenerateRefreshToken, jwtGenerateToken } from "@lib/auth/jwt";
import { existsUserByEmail, insertUser } from "@repositories/userRepository";
import { RegisterUserServerActionResponse, UserRegister } from "@types";
import { cookies } from "next/headers";

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
    firstName,
    lastName,
  });

  const refreshToken = await jwtGenerateRefreshToken({
    id: user.userId,
    type: "refresh",
  });

  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });

  cookies().set("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
  });

  return redirect(`/dashboard`);
}
