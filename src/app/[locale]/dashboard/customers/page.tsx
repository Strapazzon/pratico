"use client";

import React, { useCallback } from "react";
import { EntityGrid, EntityGridDataSource } from "@components/EntityGrid";
import { CustomerEntity } from "@entities/customerEntity";
import { Link } from "@i18n/routing";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import {
  getCustomersAction,
  searchCustomersAction,
} from "@server-actions/customerServerActions";
import { Edit, Plus, Users } from "lucide-react";
import { useTranslations } from "next-intl";

const CustomersPage: React.FC = () => {
  const t = useTranslations("customers");

  const dataSource: EntityGridDataSource<CustomerEntity> = {
    getRows: useCallback(async (page: number, perPage: number) => {
      const { customers, totalCount, totalPages } = await getCustomersAction(
        page,
        perPage
      );

      return {
        rowData: customers,
        rowCount: totalCount,
        totalPages,
      };
    }, []),
    searchRows: useCallback(async (search: string) => {
      const { customers, rowCount, totalPages } = await searchCustomersAction(
        search,
        1,
        10
      );

      return {
        rowCount,
        totalPages,
        rowData: customers,
      };
    }, []),
  };

  return (
    <Flex
      direction="column"
      height="-webkit-fill-available"
      p={{
        initial: "2",
        xs: "4",
        lg: "0",
      }}
    >
      <Flex align="center" gap="2" mb="6">
        <Users size="24" />
        <Heading size="6">{t("title")}</Heading>
      </Flex>

      <EntityGrid<CustomerEntity>
        headerRightSlot={
          <Button variant="solid" asChild>
            <Link href="/dashboard/customers/new/edit">
              <Plus size="24" />
              <Box
                display={{
                  initial: "none",
                  xs: "block",
                }}
              >
                {t("addCustomer")}
              </Box>
            </Link>
          </Button>
        }
        colDefs={[
          {
            headerName: t("fieldFullNameLabel"),
            flex: 2,
            valueGetter: ({ data }) => `${data?.firstName} ${data?.lastName}`,
          },
          {
            field: "email",
            headerName: t("fieldEmailLabel"),
            flex: 2,
          },
          {
            field: "phoneNumber",
            headerName: t("fieldPhoneNumberLabel"),
            flex: 1,
          },
          {
            field: "city",
            headerName: t("fieldCityLabel"),
            flex: 0.75,
          },
          {
            field: "country",
            headerName: t("fieldCountryLabel"),
            flex: 0.8,
          },
          {
            flex: 0.3,
            cellRenderer: ({ data }: { data: CustomerEntity }) => (
              <Flex justify="end" align="center" height="100%">
                <Button variant="ghost" asChild>
                  <Link
                    href={`/dashboard/customers/${data.customerId}/edit`}
                    prefetch
                  >
                    <Edit />
                  </Link>
                </Button>
              </Flex>
            ),
          },
        ]}
        dataSource={dataSource}
      />
    </Flex>
  );
};

export default CustomersPage;
