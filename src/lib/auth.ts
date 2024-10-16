import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        // Implementar lógica de autenticação
        // Retornar o usuário se as credenciais forem válidas
        return null;
      },
    }),
  ],
  // Configurar páginas personalizadas, callbacks, etc.
};
