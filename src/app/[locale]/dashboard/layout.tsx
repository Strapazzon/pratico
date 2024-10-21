import "@radix-ui/themes/styles.css";
import React from "react";
import { Flex } from "@radix-ui/themes";
import { DashboardHeader } from "@components/DashboardHeader";
import { AuthLoggedUserProvider } from "@providers/authLoggedUserProvider";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  return (
    <AuthLoggedUserProvider>
      <Flex direction="column">
        <DashboardHeader />
        {children}
      </Flex>
    </AuthLoggedUserProvider>
  );
};

export default DashboardLayout;
