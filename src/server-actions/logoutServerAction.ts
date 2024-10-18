"use server";

import { redirect } from "@i18n/routing";
import { cookies } from "next/headers";

export async function logoutServerAction() {
  cookies().delete("auth-token");
  cookies().delete("refresh-token");
  redirect(`/auth/login`);
}
