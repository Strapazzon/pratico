"use client";

import { Avatar, Button, DropdownMenu } from "@radix-ui/themes";
import { LogOut } from "lucide-react";
import React from "react";

export const ProfileMenu: React.FC = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost">
          <Avatar fallback="A" src="/placeholder-user.jpg" alt="User avatar" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label className="font-normal">
          <p className="text-sm font-medium leading-none">John Doe</p>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Perfil</DropdownMenu.Item>
        <DropdownMenu.Item>Configurações</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
