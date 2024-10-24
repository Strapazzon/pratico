"use client";
import { EntityGrid, EntityGridDataSource } from "@components/EntityGrid";
import { AnamnesisModelEntity } from "@entities/anamnesisModelEntity";
import { Link } from "@i18n/routing";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { getAnamnesisModelsAction } from "@server-actions/anamnesisModelActions";
import { Edit, FileBox, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const AnamnesisModelPage: React.FC = () => {
  const t = useTranslations("anamnesisModel");

  const dataSource: EntityGridDataSource<AnamnesisModelEntity> = {
    getRows: async (page: number, perPage: number, organizationId: number) => {
      const { anamnesisModels, rowCount, totalPages } =
        await getAnamnesisModelsAction(page, perPage, organizationId);

      return {
        rowCount,
        rowData: anamnesisModels as unknown as AnamnesisModelEntity[],
        totalPages,
      };
    },
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
        <FileBox size="24" />
        <Heading size="6">{t("title")}</Heading>
      </Flex>

      <EntityGrid<AnamnesisModelEntity>
        disabledSearch
        headerRightSlot={
          <Button variant="solid" asChild>
            <Link href="/dashboard/anamnesis/model/new/edit">
              <Plus size="24" />
              <Box
                display={{
                  initial: "none",
                  xs: "block",
                }}
              >
                {t("addAnamnesisModel")}
              </Box>
            </Link>
          </Button>
        }
        colDefs={[
          {
            field: "title",
            headerName: t("fieldTitleLabel"),
            flex: 2,
          },
          {
            field: "description",
            headerName: t("fieldDescriptionLabel"),
            flex: 2,
          },
          {
            flex: 0.5,
            cellRenderer: ({ data }: { data: AnamnesisModelEntity }) => (
              <Flex justify="end" align="center" height="100%">
                <Button variant="ghost" asChild>
                  <Link
                    href={`/dashboard/anamnesis/model/${data.anamnesisModelId}/edit`}
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

export default AnamnesisModelPage;
