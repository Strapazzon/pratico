"use client";
import { EntityGrid, EntityGridDataSource } from "@components/EntityGrid";
import { PageHeader } from "@components/UI/PageHeader";

import { OrganizationEntity } from "@entities/organizationEntity";
import { Link } from "@i18n/routing";
import { Box, Button, Flex } from "@radix-ui/themes";

import { listOrganizationsByUserIdAction } from "@server-actions/organizationActions";
import { Building2, Edit, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback, useState } from "react";

const OrganizationsPage: React.FC = () => {
  const t = useTranslations("organizations");
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrganizations = useCallback(async () => {
    setIsLoading(true);
    const organizations = await listOrganizationsByUserIdAction();
    setIsLoading(false);
    return {
      rowCount: organizations?.length ?? 0,
      totalPages: 1,
      rowData: organizations ?? [],
    };
  }, []);

  const dataSource: EntityGridDataSource<OrganizationEntity> = {
    getRows: fetchOrganizations,
  };

  return (
    <Flex direction="column" gap="2">
      <PageHeader title={t("title")} icon={<Building2 size="24" />} />
      <EntityGrid<OrganizationEntity>
        dataSource={dataSource}
        isLoading={isLoading}
        disablePagination={true}
        disabledSearch={true}
        colDefs={[
          {
            headerName: t("name"),
            field: "name",
            flex: 1,
          },
          {
            headerName: t("address"),
            field: "address",
          },
          {
            headerName: t("city"),
            field: "city",
          },
          {
            headerName: t("country"),
            field: "country",
          },
          {
            headerName: t("taxNumber"),
            field: "taxNumber",
          },
          {
            flex: 0.5,
            cellRenderer: ({ data }: { data: OrganizationEntity }) => (
              <Flex justify="end" align="center" height="100%">
                <Button variant="ghost" asChild>
                  <Link
                    href={`/dashboard/organizations/${data.organizationId}/edit`}
                    prefetch
                  >
                    <Edit />
                  </Link>
                </Button>
              </Flex>
            ),
          },
        ]}
        headerRightSlot={
          <Button variant="solid" asChild>
            <Link href="/dashboard/organizations/new/edit">
              <Plus size="24" />
              <Box
                display={{
                  initial: "none",
                  xs: "block",
                }}
              >
                {t("addOrganization")}
              </Box>
            </Link>
          </Button>
        }
      />
    </Flex>
  );
};

export default OrganizationsPage;
