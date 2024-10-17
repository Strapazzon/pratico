import React from "react";
import "@radix-ui/themes/styles.css";
import "@styles/globals.scss";
import { Container, Theme } from "@radix-ui/themes";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

const RootLayout: React.FC<DashboardLayoutProps> = async ({
  children,
  params,
}) => {
  const { locale } = params;
  const messages = await getMessages({
    locale,
  });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Theme
            accentColor="purple"
            grayColor="gray"
            panelBackground="translucent"
          >
            <Container
              p={{
                xs: "1",
                md: "2",
              }}
            >
              {children}
            </Container>
          </Theme>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
