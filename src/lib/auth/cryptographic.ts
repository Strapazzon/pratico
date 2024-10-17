import * as crypto from "crypto";

const saltSize = Number(process.env.AUTH_SALT_SIZE ?? 16);

export const generateSalt = (): string =>
  crypto.randomBytes(saltSize).toString("hex");

export const generateHashSha512 = (password: string, salt: string): string => {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);

  return hash.digest("hex");
};

export const validatePassword = (password: string, salt = "", hash = "") => {
  const newHash = generateHashSha512(password, salt);
  return hash === newHash;
};
