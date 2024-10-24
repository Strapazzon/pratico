import "./style.scss";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import useDebounce from "@hooks/useDebounce";
import { useTranslations } from "next-intl";
import { AuthLoggedUserContext } from "@providers/authLoggedUserProvider";

type GetRowResponse<E> = {
  rowCount: number;
  totalPages: number;
  rowData: E[];
};

export interface EntityGridDataSource<E> {
  getRows: (
    page: number,
    perPage: number,
    organizationId: number
  ) => Promise<GetRowResponse<E>>;
  searchRows?: (search: string) => Promise<GetRowResponse<E>>;
}

interface EntityGridProps<E extends FieldValues> {
  colDefs: Array<ColDef<E> | ColGroupDef<E>>;
  isLoading?: boolean;
  dataSource: EntityGridDataSource<E>;
  paginationPageSize?: number;
  headerRightSlot?: React.ReactElement;
  disabledSearch?: boolean;
  disablePagination?: boolean;
}

export const EntityGrid = <E extends FieldValues>({
  colDefs,
  dataSource,
  paginationPageSize = 10,
  headerRightSlot,
  disabledSearch,
  disablePagination,
}: EntityGridProps<E>): React.ReactElement => {
  const t = useTranslations("entityGrid");
  const [rowData, setRowData] = React.useState<E[]>();
  const [rowCount, setRowCount] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>();
  const debouncedSearch = useDebounce(search, 500);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedOrganizationId } = useContext(AuthLoggedUserContext);

  const loadFromDataSource = useCallback(
    async (organizationId: number) => {
      setIsLoading(true);
      const { rowCount, rowData, totalPages } = await dataSource.getRows(
        page,
        paginationPageSize,
        organizationId
      );
      setTotalPages(totalPages);
      setRowCount(rowCount);
      setRowData(rowData);
      setIsLoading(false);
    },
    [dataSource, page, paginationPageSize]
  );

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      loadFromDataSource(selectedOrganizationId);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      loadFromDataSource(selectedOrganizationId);
    }
  };

  const goToFirstPage = () => {
    setPage(1);
    loadFromDataSource(selectedOrganizationId);
  };

  const goToLastPage = () => {
    setPage(totalPages);
    loadFromDataSource(selectedOrganizationId);
  };

  const rowStart = (page - 1) * paginationPageSize + 1;
  const rowEnd = Math.min(rowCount, page * paginationPageSize);

  const searchRows = useCallback(async () => {
    if (!dataSource.searchRows || !debouncedSearch) {
      return;
    }

    const { rowCount, rowData, totalPages } = await dataSource.searchRows(
      debouncedSearch
    );
    setTotalPages(totalPages);
    setRowCount(rowCount);
    setRowData(rowData);
  }, [dataSource, debouncedSearch]);

  const fetchData = useCallback(() => {
    if (debouncedSearch) {
      searchRows();
    } else if (!rowData) {
      loadFromDataSource(selectedOrganizationId);
    }
  }, [
    debouncedSearch,
    loadFromDataSource,
    rowData,
    searchRows,
    selectedOrganizationId,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="ag-theme-quartz">
      <Flex justify="between" pb="3">
        {disabledSearch ? (
          <div></div>
        ) : (
          <TextField.Root
            placeholder={t("searchPlaceholder")}
            size="2"
            mb="3"
            onChange={(e) => setSearch(e.target.value)}
          >
            <TextField.Slot>
              <Search size="16" />
            </TextField.Slot>
          </TextField.Root>
        )}
        {headerRightSlot}
      </Flex>

      <AgGridReact<E>
        localeText={{
          noRowsToShow: t("noRowsToShow"),
          loadingOoo: t("loading"),
          page: t("page"),
          of: t("of"),
          to: t("to"),
          next: t("next"),
          last: t("last"),
          first: t("first"),
          previous: t("previous"),
          loading: t("loading"),
        }}
        loading={isLoading}
        rowData={rowData}
        columnDefs={colDefs}
      />

      {!disablePagination && !debouncedSearch ? (
        <Flex justify="between" align="center" py="3" gap="5">
          <Text size="3">{`${rowStart} to ${rowEnd} of ${rowCount} rows`}</Text>

          <Flex gap="4">
            <Button variant="ghost" onClick={goToFirstPage}>
              <ChevronFirst />
            </Button>

            <Button variant="ghost" disabled={page === 1} onClick={nextPage}>
              <ChevronLeft />
            </Button>

            <Text size="3">{`${page} of ${totalPages}`}</Text>

            <Button
              variant="ghost"
              disabled={page === totalPages}
              onClick={prevPage}
            >
              <ChevronRight />
            </Button>

            <Button variant="ghost" onClick={goToLastPage}>
              <ChevronLast />
            </Button>
          </Flex>
        </Flex>
      ) : null}
    </div>
  );
};
