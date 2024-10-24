"use server";
import { cookies } from "next/headers";
import { jwtVerifyToken } from "../lib/auth/jwt";
import { redirect } from "@i18n/routing";

export const getUserDataFromSession = async () => {
  try {
    const token = cookies().get("auth-token");
    return await jwtVerifyToken(token?.value);
  } catch {
    cookies().delete("auth-token");
    cookies().delete("refresh-token");
    redirect(`/auth/login`);
    throw new Error("Invalid token");
  }
};
