import "@radix-ui/themes/styles.css";
import React from "react";
import { Flex } from "@radix-ui/themes";
import { DashboardHeader } from "@components/DashboardHeader";
import { AuthLoggedUserProvider } from "@providers/authLoggedUserProvider";
import { OrganizationsProvider } from "@providers/organizationsProvider";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  return (
    <AuthLoggedUserProvider>
      <OrganizationsProvider>
        <Flex direction="column">
          <DashboardHeader />
          {children}
        </Flex>
      </OrganizationsProvider>
    </AuthLoggedUserProvider>
  );
};

export default DashboardLayout;
