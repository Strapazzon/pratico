"use server";

import { getUserDataFromSession } from "@server-actions/getUserDataFromSessionAction";

export async function getUserDataServerAction() {
  return getUserDataFromSession();
}
