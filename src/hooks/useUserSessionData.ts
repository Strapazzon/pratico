import { JwtTokenData } from "@lib/auth/jwt";
import { getUserDataServerAction } from "@server-actions/getUserDataServerAction";
import { useEffect, useState } from "react";

export const useUserSessionData = (invalidate: string | number | boolean) => {
  const [data, setData] = useState<JwtTokenData>();

  const fetchData = async () => {
    const data = await getUserDataServerAction();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [invalidate]);

  return {
    userData: data,
    userNameInitials: data
      ? `${data.firstName[0]}${data.lastName[0]}`.toUpperCase()
      : "",
  };
};
