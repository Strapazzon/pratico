"use client";
import { JwtTokenData } from "@lib/auth/jwt";
import { getUserDataServerAction } from "@server-actions/getUserDataServerAction";
import React, { createContext, useCallback, useEffect, useState } from "react";

type AuthLoggedUserContextProps = {
  userData?: JwtTokenData | null;
  userNameInitials?: string;
  refreshUserData: () => void;
  selectedOrganizationId: number;
  setSelectedOrganizationId: (id: number) => void;
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

  const [userNameInitials, setUserNameInitials] = useState<string>();
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<number>(
    userData?.organizations[0] ?? -1
  );

  const getUserNameInitials = useCallback((data?: JwtTokenData) => {
    if (!data) {
      return "";
    }
    const { firstName, lastName } = data;
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }, []);

  const fetchUserData = useCallback(async () => {
    const data = await getUserDataServerAction();
    setUserData(data);
    if (data) {
      setUserNameInitials(getUserNameInitials(data));
      setSelectedOrganizationId(data.organizations[0]);
    }
  }, [getUserNameInitials]);

  const refreshUserData = useCallback(async () => {
    await fetchUserData();
  }, [fetchUserData]);

  const setOrganizationIdHandler = useCallback(
    (id: number) => {
      if (userData?.organizations?.indexOf(id) === -1) {
        return;
      }

      setSelectedOrganizationId(id);
    },
    [userData?.organizations]
  );

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, selectedOrganizationId]);

  return (
    <AuthLoggedUserContext.Provider
      value={{
        userData,
        userNameInitials,
        refreshUserData,
        selectedOrganizationId,
        setSelectedOrganizationId: setOrganizationIdHandler,
      }}
    >
      {children}
    </AuthLoggedUserContext.Provider>
  );
};
