"use client";

import { AuthLoggedUserContext } from "@providers/authLoggedUserProvider";
import { Avatar, DropdownMenu, Flex, Heading, Text } from "@radix-ui/themes";
import { logoutServerAction } from "@server-actions/logoutServerAction";
import { LogOut } from "lucide-react";
import React, { useContext } from "react";

export const ProfileMenu: React.FC = () => {
  const { userData, userNameInitials } = useContext(AuthLoggedUserContext);

  const logoutHandler = () => {
    logoutServerAction();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="ghost-button">
          <Avatar fallback={userNameInitials ?? ""} alt="User avatar" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Flex direction="column">
            <Heading size="1">
              {userData?.firstName} {userData?.lastName}
            </Heading>
            <Text size="1">{userData?.email}</Text>
          </Flex>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Perfil</DropdownMenu.Item>
        <DropdownMenu.Item>Configurações</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={logoutHandler}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
