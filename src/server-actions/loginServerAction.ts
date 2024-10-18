"use server";

import { redirect } from "@i18n/routing";
import { validatePassword } from "@lib/auth/cryptographic";
import { jwtGenerateRefreshToken, jwtGenerateToken } from "@lib/auth/jwt";
import { findUserByEmail } from "@repositories/userRepository";
import { LoginServerActionResponse } from "@types";
import { cookies } from "next/headers";

export async function loginServerAction(
  email: string,
  password: string
): Promise<LoginServerActionResponse> {
  const user = await findUserByEmail(email);

  if (!user) {
    return {
      error: "invalidCredentials",
    };
  }

  const { salt, passwordHash } = user;

  console.log("validation => ", validatePassword(password, salt, passwordHash));

  if (!password || !validatePassword(password, salt, passwordHash)) {
    return {
      error: "invalidCredentials",
    };
  }

  if (!user.firstName || !user.lastName || !user.email) {
    return {
      error: "unknownError",
    };
  }

  const token = await jwtGenerateToken({
    id: user.userId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
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
