import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";
import { authMiddleware } from "@lib/auth/auth-middleware";

// Configuração do middleware next-intl
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const intlResult = await intlMiddleware(request);

  // Authentication middleware
  const authResponse = authMiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  return intlResult;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pt-BR|en)/:path*"],
};
