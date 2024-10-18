"use client";
import { JwtTokenData } from "@lib/auth/jwt";
import { getUserDataServerAction } from "@server-actions/getUserDataServerAction";
import React, { createContext, useCallback, useEffect } from "react";

type AuthLoggedUserContextProps = {
  userData?: JwtTokenData | null;
  userNameInitials?: string;
};

type AuthLoggedUserProviderProps = {
  children: React.ReactNode;
};

export const AuthLoggedUserContext = createContext<AuthLoggedUserContextProps>(
  {}
);

export const AuthLoggedUserProvider: React.FC<AuthLoggedUserProviderProps> = ({
  children,
}) => {
  const [userData, setUserData] = React.useState<
    JwtTokenData | undefined | null
  >();

  const [userNameInitials, setUserNameInitials] = React.useState<string>();

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
    }
  }, [getUserNameInitials]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <AuthLoggedUserContext.Provider value={{ userData, userNameInitials }}>
      {children}
    </AuthLoggedUserContext.Provider>
  );
};
