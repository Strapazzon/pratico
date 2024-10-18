import "@radix-ui/themes/styles.css";
import React from "react";
import { Flex } from "@radix-ui/themes";
import { DashboardHeader } from "@components/DashboardHeader";
import { AuthLoggedUserProvider } from "@providers/authLoggedUserProvider";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  return (
    <AuthLoggedUserProvider>
      <Flex direction="column" width="100%">
        <DashboardHeader />
        {children}
      </Flex>
    </AuthLoggedUserProvider>
  );
};

export default DashboardLayout;
