"use server";
import { InsertCustomerRow } from "@database";
import { CustomerEntity } from "@entities/customerEntity";
import { getUserDataFromSession } from "@server-actions/getUserDataFromSessionAction";
import {
  countCustomersByOrganizationIds,
  findCustomerByIdAndOrganizations,
  insertCustomer,
  listCustomersByOrganizationIds,
  searchCustomersByOrganizationIds,
  updateCustomer,
} from "@repositories/customerRepository";
import { validateUserOrganizationRights } from "@lib/auth/validateUserOrganizationRights";

export async function createCustomerAction(
  data: CustomerEntity,
  organizationId: number
): Promise<InsertCustomerRow> {
  validateUserOrganizationRights(organizationId);

  return await insertCustomer({
    ...data,
    customerId: undefined,
    createdAt: undefined,
    organizationId,
  } as unknown as InsertCustomerRow);
}

export async function updateCustomerAction(
  customerId: number,
  data: CustomerEntity
): Promise<InsertCustomerRow> {
  const { organizations } = await getUserDataFromSession();

  return await updateCustomer(customerId, organizations, {
    ...data,
    customerId,
    organizationId: undefined,
  } as unknown as InsertCustomerRow);
}

export async function getCustomerAction(
  customerId: number,
  organizationId: number
) {
  validateUserOrganizationRights(organizationId);

  return await findCustomerByIdAndOrganizations(customerId, [organizationId]);
}

export async function getCustomersAction(
  page = 1,
  perPage = 10,
  organizationId: number
) {
  validateUserOrganizationRights(organizationId);
  const customers = (await listCustomersByOrganizationIds(
    [organizationId],
    page,
    perPage
  )) as unknown as CustomerEntity[];

  const totalCount = await countCustomersByOrganizationIds([organizationId]);
  const totalPages = Math.ceil(totalCount / perPage);

  return { customers, totalCount, totalPages };
}

export async function searchCustomersAction(
  query: string,
  page = 1,
  perPage = 10
) {
  const { organizations } = await getUserDataFromSession();
  const { customers, rowCount, totalPages } =
    await searchCustomersByOrganizationIds(organizations, query, page, perPage);

  return {
    customers: customers as unknown as CustomerEntity[],
    rowCount,
    totalPages,
  };
}
