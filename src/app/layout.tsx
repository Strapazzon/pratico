import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";

// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sistema de Gerenciamento",
  description: "Sistema de gerenciamento com autenticação e múltiplas empresas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
