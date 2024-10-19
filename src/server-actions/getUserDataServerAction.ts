"use server";

import { getUserDataFromSession } from "@lib/auth/getUserDataFromSession";

export async function getUserDataServerAction() {
  return getUserDataFromSession();
}
