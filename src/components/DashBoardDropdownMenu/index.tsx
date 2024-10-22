"use client";

import { DropdownMenu } from "@radix-ui/themes";
import {
  Briefcase,
  FileText,
  ListOrdered,
  MenuIcon,
  Users,
} from "lucide-react";
import { Link } from "@i18n/routing";
import React from "react";
import { useTranslations } from "next-intl";

export const DashBoardDropdownMenu: React.FC = () => {
  const t = useTranslations("dashboard");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="ghost-button">
          <MenuIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item asChild>
          <Link href="/dashboard/customers">
            <Users />
            <span>{t("clients")}</span>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <Link href="/dashboard/services">
            <Briefcase />
            <span>{t("services")}</span>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <Link href="/dashboard/anamnesis">
            <FileText />
            <span>{t("anamnesis")}</span>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <Link href="/dashboard/work-orders">
            <ListOrdered />
            <span>{t("workOrders")}</span>
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
