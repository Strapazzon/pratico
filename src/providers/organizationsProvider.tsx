"use client";
import { PageLoading } from "@components/PageLoading";
import { OrganizationEntity } from "@entities/organizationEntity";
import { BrowserStorage } from "@lib/localStorage/localStorage";
import { listOrganizationsByUserIdAction } from "@server-actions/organizationActions";
import React, { createContext, useCallback, useEffect, useState } from "react";

type OrganizationsContextProps = {
  setOrganizationId: (id: number) => void;
  organization?: OrganizationEntity;
  organizationId?: number;
  listOfOrganizations?: OrganizationEntity[];
  refreshOrganizations: () => void;
};

type OrganizationsProviderProps = {
  children: React.ReactNode;
};

export const OrganizationsContext = createContext<OrganizationsContextProps>(
  {} as OrganizationsContextProps
);

export const OrganizationsProvider: React.FC<OrganizationsProviderProps> = ({
  children,
}) => {
  const [organizations, setOrganizations] = useState<OrganizationEntity[]>();
  const [isLoading, setIsLoading] = useState(false);
  const organizationIdFormStorage = BrowserStorage.get<number>(
    "selectedOrganizationId"
  );

  const [organizationId, setOrganizationId] = useState<number | undefined>(
    organizationIdFormStorage
  );

  const setOrganizationIdHandler = useCallback((id: number) => {
    BrowserStorage.set("selectedOrganizationId", id);
    setOrganizationId(id);
  }, []);

  const fetchOrganizations = useCallback(
    async (id?: number) => {
      setIsLoading(true);
      try {
        const organizationsData = await listOrganizationsByUserIdAction();
        setOrganizations(organizationsData);

        if (!id) {
          const firstOrganization = Number(
            organizationsData?.[0].organizationId ?? -1
          );
          setOrganizationIdHandler(firstOrganization);
        } else {
          setOrganizationIdHandler(id);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setOrganizationIdHandler]
  );

  const findOrganization = useCallback(
    (organizationId?: number) => {
      if (!organizationId) return;

      return organizations?.find(
        (org) => Number(org.organizationId) === organizationId
      );
    },
    [organizations]
  );

  const refreshOrganizations = useCallback(() => {
    fetchOrganizations(organizationId);
  }, [fetchOrganizations, organizationId]);

  useEffect(() => {
    fetchOrganizations(organizationId);
  }, [fetchOrganizations, organizationId]);

  return (
    <OrganizationsContext.Provider
      value={{
        setOrganizationId: setOrganizationIdHandler,
        organization: findOrganization(organizationId),
        listOfOrganizations: organizations,
        organizationId,
        refreshOrganizations,
      }}
    >
      {isLoading ? <PageLoading /> : children}
    </OrganizationsContext.Provider>
  );
};
