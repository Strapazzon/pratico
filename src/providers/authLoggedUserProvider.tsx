"use client";
import { useRouter } from "@i18n/routing";
import { JwtTokenData } from "@lib/auth/jwt";
import { getUserDataServerAction } from "@server-actions/getUserDataServerAction";
import React, { createContext, useCallback, useEffect, useState } from "react";

type AuthLoggedUserContextProps = {
  userData?: JwtTokenData | null;
  userNameInitials?: string;
  refreshUserData: () => void;
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
  const router = useRouter();

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

      if (data.organizations.length === 0) {
        router.push("/welcome");
      }
    }
  }, [getUserNameInitials, router]);

  const refreshUserData = useCallback(async () => {
    await fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <AuthLoggedUserContext.Provider
      value={{
        userData,
        userNameInitials,
        refreshUserData,
      }}
    >
      {children}
    </AuthLoggedUserContext.Provider>
  );
};
