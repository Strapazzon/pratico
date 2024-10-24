"use client";

import { useRouter } from "@i18n/routing";
import { AuthLoggedUserContext } from "@providers/authLoggedUserProvider";
import { Avatar, DropdownMenu, Flex, Heading, Text } from "@radix-ui/themes";
import { logoutServerAction } from "@server-actions/logoutServerAction";
import { Building2, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

export const ProfileMenu: React.FC = () => {
  const { userData, userNameInitials } = useContext(AuthLoggedUserContext);
  const t = useTranslations("profileMenu");
  const router = useRouter();

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
        <DropdownMenu.Item
          onClick={() => router.push(`/dashboard/organizations`)}
        >
          <Flex align="center" gap="1">
            <Building2 size="16" />
            {t("organizations")}
          </Flex>
        </DropdownMenu.Item>
        <DropdownMenu.Item>{t("profile")}</DropdownMenu.Item>
        <DropdownMenu.Item>{t("settings")}</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={logoutHandler}>
          <LogOut />
          <span>{t("logout")}</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
