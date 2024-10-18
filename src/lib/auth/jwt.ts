import jwt from "jsonwebtoken";
import { generateHashSha512 } from "./cryptographic";

const privateKey = `${process.env.AUTH_PRIVATE_KEY}`;
const tokenLife = Number(process.env.AUTH_TOKEN_LIFE ?? 86400000);
const refreshTokenLife = Number(
  process.env.AUTH_REFRESH_TOKEN_LIFE ?? 96400000
);
const resetPasswordTokenLife = Number(
  process.env.AUTH_RESET_PASSWORD_TOKEN_LIFE ?? 3600000
);

const algorithm: jwt.Algorithm = "HS512";

export type JwtTokenData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type JwtRefreshTokenData = {
  type: "refresh";
  id: string;
};

export type JwtResetPasswordTokenData = {
  type: "reset-password";
  email: string;
};

export const jwtGenerateToken = async (data: JwtTokenData) =>
  jwt.sign(
    {
      data,
    },
    privateKey,
    { expiresIn: tokenLife, algorithm }
  );

export const jwtGenerateRefreshToken = async (data: JwtRefreshTokenData) =>
  jwt.sign(
    {
      data,
    },
    privateKey,
    { expiresIn: refreshTokenLife, algorithm }
  );

export const jwtGenerateResetPasswordToken = async (
  data: JwtResetPasswordTokenData
): Promise<{ resetToken: string; tokenHash: string }> => {
  const resetToken = jwt.sign(
    {
      data,
    },
    privateKey,
    { expiresIn: resetPasswordTokenLife, algorithm }
  );
  return { resetToken, tokenHash: generateHashSha512(resetToken, privateKey) };
};

export const jwtGenerateResetPasswordTokenHash = (token: string) =>
  generateHashSha512(token, privateKey);

export const jwtVerifyToken = (token?: string): Promise<JwtTokenData> =>
  new Promise((resolve, reject) => {
    if (!token) {
      return reject(new Error("TokenExpiredError"));
    }

    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        return reject(new Error("TokenExpiredError"));
      }

      resolve((decoded as jwt.JwtPayload)?.data as JwtTokenData);
    });
  });

export const jwtVerifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, privateKey) as {
      data: JwtRefreshTokenData;
    };
  } catch {
    throw new Error("Access denied.");
  }
};

export const jwtVerifyResetToken = (token: string) => {
  try {
    return jwt.verify(token, privateKey) as {
      data: JwtResetPasswordTokenData;
    };
  } catch {
    throw new Error("Access denied.");
  }
};
