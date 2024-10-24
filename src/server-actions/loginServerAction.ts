"use server";

import { redirect } from "@i18n/routing";
import { validatePassword } from "@lib/auth/cryptographic";
import {
  jwtGenerateRefreshToken,
  jwtGenerateToken,
  jwtVerifyRefreshToken,
} from "@lib/auth/jwt";
import { setAuthCookies } from "@lib/auth/setAuthCookies";
import { listOrganizationsByUserOwnerId } from "@repositories/organizationRepository";
import { findUserByEmail, findUserById } from "@repositories/userRepository";
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

  const userOrganizations = await listOrganizationsByUserOwnerId(user.userId);

  const token = await jwtGenerateToken({
    id: user.userId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    organizations: userOrganizations.map((org) => org.organizationId),
  });

  const refreshToken = await jwtGenerateRefreshToken({
    id: user.userId,
    type: "refresh",
  });

  setAuthCookies(token, refreshToken);

  return redirect(`/dashboard`);
}

export const refreshTokenServerAction =
  async (): Promise<LoginServerActionResponse> => {
    const refreshToken = await cookies().get("refresh-token");

    if (!refreshToken?.value) {
      return redirect(`/login`);
    }

    const decoded = jwtVerifyRefreshToken(refreshToken?.value);
    const tokenUserId = decoded.data.id;

    const user = await findUserById(tokenUserId);

    if (!user) {
      return redirect(`/login`);
    }

    const userOrganizations = await listOrganizationsByUserOwnerId(user.userId);

    const token = await jwtGenerateToken({
      id: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      organizations: userOrganizations.map((org) => org.organizationId),
    });

    const newRefreshToken = await jwtGenerateRefreshToken({
      id: user.userId,
      type: "refresh",
    });

    setAuthCookies(token, newRefreshToken);

    return {};
  };
