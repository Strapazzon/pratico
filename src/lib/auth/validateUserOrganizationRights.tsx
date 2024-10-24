import "server-only";
import { getUserDataFromSession } from "../../server-actions/getUserDataFromSessionAction";

export const validateUserOrganizationRights = async (
  organizationId: number
) => {
  const { organizations } = await getUserDataFromSession();

  if (organizationId && !organizations.includes(organizationId)) {
    throw new Error("Unauthorized");
  }
};
