"use server";
import { InsertCustomerRow } from "@database";
import { CustomerEntity } from "@entities/customerEntity";
import { getUserDataFromSession } from "@lib/auth/getUserDataFromSession";
import {
  findCustomerByIdAndOrganizations,
  insertCustomer,
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

  return await updateCustomer(organizations[0], {
    ...data,
    customerId,
    organizationId: undefined,
  } as unknown as InsertCustomerRow);
}

export async function getCustomerAction(customerId: number) {
  const { organizations } = await getUserDataFromSession();
  return await findCustomerByIdAndOrganizations(customerId, organizations);
}
