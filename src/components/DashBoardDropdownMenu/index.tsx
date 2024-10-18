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
          <MenuIcon className="h-6 w-6" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Link href="/dashboard/customers">
          <DropdownMenu.Item>
            <Users className="mr-2 h-5 w-5" />
            <span>{t("clients")}</span>
          </DropdownMenu.Item>
        </Link>
        <Link href="/dashboard/services">
          <DropdownMenu.Item>
            <Briefcase className="mr-2 h-5 w-5" />
            <span>{t("services")}</span>
          </DropdownMenu.Item>
        </Link>
        <Link href="/dashboard/anamnesis">
          <DropdownMenu.Item>
            <FileText className="mr-2 h-5 w-5" />
            <span>{t("anamnesis")}</span>
          </DropdownMenu.Item>
        </Link>
        <Link href="/dashboard/work-orders">
          <DropdownMenu.Item>
            <ListOrdered className="mr-2 h-5 w-5" />
            <span>{t("workOrders")}</span>
          </DropdownMenu.Item>
        </Link>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
