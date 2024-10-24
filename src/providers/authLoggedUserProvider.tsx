"use client";
import { OrganizationEntity } from "@entities/organizationEntity";
import { JwtTokenData } from "@lib/auth/jwt";
import { BrowserStorage } from "@lib/localStorage/localStorage";
import { getUserDataServerAction } from "@server-actions/getUserDataServerAction";
import { listOrganizationsByUserIdAction } from "@server-actions/organizationActions";
import React, { createContext, useCallback, useEffect, useState } from "react";

type AuthLoggedUserContextProps = {
  userData?: JwtTokenData | null;
  userNameInitials?: string;
  refreshUserData: () => void;
  selectedOrganizationId: number;
  setSelectedOrganizationId: (id: number) => void;
  organizations?: OrganizationEntity[];
};

type AuthLoggedUserProviderProps = {
  children: React.ReactNode;
};

export const AuthLoggedUserContext = createContext<AuthLoggedUserContextProps>(
  {} as AuthLoggedUserContextProps
);

export const AuthLoggedUserProvider: React.FC<AuthLoggedUserProviderProps> = ({
  children,
}) => {
  const [userData, setUserData] = useState<JwtTokenData | undefined | null>();
  const [organizations, setOrganizations] = useState<OrganizationEntity[]>();
  const [isLoading, setIsLoading] = useState(false);

  const [userNameInitials, setUserNameInitials] = useState<string>();

  const orIdFormStorage = BrowserStorage.get<number>("selectedOrganizationId");

  const [selectedOrganizationId, setSelectedOrganizationId] = useState<
    number | null
  >(orIdFormStorage);

  const getUserNameInitials = useCallback((data?: JwtTokenData) => {
    if (!data) {
      return "";
    }
    const { firstName, lastName } = data;
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }, []);

  const setOrganizationIdHandler = useCallback(
    (id: number) => {
      if (userData?.organizations?.indexOf(id) === -1) {
        console.error("Invalid organization id");
        return;
      }

      BrowserStorage.set("selectedOrganizationId", id);
      setSelectedOrganizationId(id);
    },
    [userData?.organizations]
  );

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    const organizationsData = await listOrganizationsByUserIdAction();
    setOrganizations(organizationsData);

    const data = await getUserDataServerAction();
    setUserData(data);

    if (data) {
      setUserNameInitials(getUserNameInitials(data));
    }
    setIsLoading(false);
  }, [getUserNameInitials]);

  const refreshUserData = useCallback(async () => {
    await fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, selectedOrganizationId]);

  return (
    <AuthLoggedUserContext.Provider
      value={{
        userData,
        userNameInitials,
        refreshUserData,
        selectedOrganizationId: selectedOrganizationId ?? -1,
        setSelectedOrganizationId: setOrganizationIdHandler,
        organizations,
      }}
    >
      {isLoading ? null : children}
    </AuthLoggedUserContext.Provider>
  );
};
