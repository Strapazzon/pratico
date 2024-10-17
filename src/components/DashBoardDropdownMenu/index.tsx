"use client";

import { Button, DropdownMenu } from "@radix-ui/themes";
import {
  Briefcase,
  ClipboardList,
  FileText,
  ListOrdered,
  MenuIcon,
  Users,
} from "lucide-react";
import { Link } from "@i18n/routing";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";

export const DashBoardDropdownMenu: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("dashboard");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Link href="/dashboard/clients">
          <DropdownMenu.Item onClick={() => router.push("/dashboard/clients")}>
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
