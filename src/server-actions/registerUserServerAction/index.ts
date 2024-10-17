"use server";

import { generateHashSha512, generateSalt } from "@lib/auth/cryptographic";
import { UserRegister } from "@types";

interface RegisterUserServerActionResponse {
  success: boolean;
  token?: string;
  error?: "passwordsDoNotMatch" | "emailAlreadyExists" | "unknownError";
}

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

  const salt = generateSalt();
  const passwordHash = generateHashSha512(password, salt);

  console.log("User registered", {
    firstName,
    lastName,
    email,
    passwordHash,
  });

  return {
    success: true,
    token: "  ",
  };
}
