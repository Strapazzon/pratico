import "@radix-ui/themes/styles.css";
import React from "react";
import { Flex } from "@radix-ui/themes";
import { DashBoardDropdownMenu } from "@components/DashBoardDropdownMenu";
import { ProfileMenu } from "@components/ProfileMenu";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" width="100%" pr="3">
      <Flex justify="between" align="center">
        <DashBoardDropdownMenu />
        <ProfileMenu />
      </Flex>
      {children}
    </Flex>
  );
};

export default DashboardLayout;
