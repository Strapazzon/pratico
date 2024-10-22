import React from "react";
import "@radix-ui/themes/styles.css";
import "@styles/globals.scss";
import { Container, ScrollArea, Theme } from "@radix-ui/themes";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Open_Sans } from "next/font/google";
import StyledComponentsRegistry from "@lib/styles/styledComponentsRegistry";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

const font = Open_Sans({
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const RootLayout: React.FC<DashboardLayoutProps> = async ({
  children,
  params,
}) => {
  const { locale } = params;
  const messages = await getMessages({
    locale,
  });

  return (
    <html lang={locale} className={font.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Theme
            accentColor="purple"
            grayColor="gray"
            panelBackground="translucent"
          >
            <StyledComponentsRegistry>
              <ScrollArea
                type="scroll"
                scrollbars="vertical"
                style={{ height: "100vh" }}
              >
                <Container
                  style={{
                    minHeight: "100vh",
                  }}
                >
                  {children}
                </Container>
              </ScrollArea>
            </StyledComponentsRegistry>
          </Theme>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
