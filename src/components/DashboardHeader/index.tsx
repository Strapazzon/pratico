"use client";
import React from "react";
import { DashBoardDropdownMenu } from "@components/DashBoardDropdownMenu";
import { ProfileMenu } from "@components/ProfileMenu";
import { Flex } from "@radix-ui/themes";

export const DashboardHeader: React.FC = () => {
  return (
    <Flex
      justify="between"
      align="center"
      py={{
        initial: "2",
        lg: "4",
      }}
      px={{
        initial: "2",
        lg: "0",
      }}
    >
      <DashBoardDropdownMenu />
      <ProfileMenu />
    </Flex>
  );
};
