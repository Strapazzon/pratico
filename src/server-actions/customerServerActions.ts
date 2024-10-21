"use server";
import { InsertCustomerRow } from "@database";
import { CustomerEntity } from "@entities/customerEntity";
import { getUserDataFromSession } from "@lib/auth/getUserDataFromSession";
import {
  countCustomersByOrganizationIds,
  findCustomerByIdAndOrganizations,
  insertCustomer,
  listCustomersByOrganizationIds,
  searchCustomersByOrganizationIds,
  updateCustomer,
} from "@repositories/customerRepository";

export async function createCustomerAction(
  data: CustomerEntity
): Promise<InsertCustomerRow> {
  const { organizations } = await getUserDataFromSession();

  return await insertCustomer({
    ...data,
    customerId: undefined,
    createdAt: undefined,
    organizationId: organizations[0],
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

export async function getCustomerAction(customerId: number) {
  const { organizations } = await getUserDataFromSession();
  return await findCustomerByIdAndOrganizations(customerId, organizations);
}

export async function getCustomersAction(page = 1, perPage = 10) {
  const { organizations } = await getUserDataFromSession();
  const customers = (await listCustomersByOrganizationIds(
    organizations,
    page,
    perPage
  )) as unknown as CustomerEntity[];

  const totalCount = await countCustomersByOrganizationIds(organizations);
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
