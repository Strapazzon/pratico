"use server";

import { redirect } from "@i18n/routing";
import { jwtVerifyToken } from "@lib/auth/jwt";
import { cookies } from "next/headers";

export async function getUserDataServerAction() {
  try {
    const token = cookies().get("auth-token");
    return await jwtVerifyToken(token?.value);
  } catch {
    cookies().delete("auth-token");
    cookies().delete("refresh-token");
    redirect(`/auth/login`);
    return null;
  }
}
