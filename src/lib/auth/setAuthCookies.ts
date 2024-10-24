import "server-only";
import { cookies } from "next/headers";

export function setAuthCookies(authToken: string, refreshToken: string) {
  cookies().set("auth-token", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: Number(process.env.AUTH_TOKEN_LIFE),
    path: "/",
  });

  cookies().set("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: Number(process.env.AUTH_REFRESH_TOKEN_LIFE),
  });
}
