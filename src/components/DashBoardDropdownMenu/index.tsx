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
        <Link href="/dashboard/customers">
          <DropdownMenu.Item>
            <Users />
            <span>{t("clients")}</span>
          </DropdownMenu.Item>
        </Link>
        <Link href="/dashboard/services">
          <DropdownMenu.Item>
            <Briefcase />
            <span>{t("services")}</span>
          </DropdownMenu.Item>
        </Link>
        <Link href="/dashboard/anamnesis">
          <DropdownMenu.Item>
            <FileText />
            <span>{t("anamnesis")}</span>
          </DropdownMenu.Item>
        </Link>
        <Link href="/dashboard/work-orders">
          <DropdownMenu.Item>
            <ListOrdered />
            <span>{t("workOrders")}</span>
          </DropdownMenu.Item>
        </Link>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
