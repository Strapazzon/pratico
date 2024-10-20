import "server-only";

import {
  CustomerRow,
  db,
  InsertCustomerRow,
  UpdateCustomerRow,
} from "@database";

export async function insertCustomer(
  customer: InsertCustomerRow
): Promise<CustomerRow> {
  const insertedCustomer = await db
    .insertInto("customer")
    .values(customer)
    .returningAll()
    .executeTakeFirstOrThrow();

  return insertedCustomer;
}

export async function findCustomerByEmail(
  email: string
): Promise<CustomerRow | undefined> {
  const customer = await db
    .selectFrom("customer")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  return customer;
}

export async function findCustomerById(
  customerId: number
): Promise<CustomerRow | undefined> {
  const customer = await db
    .selectFrom("customer")
    .selectAll()
    .where("customerId", "=", customerId)
    .executeTakeFirst();

  return customer;
}

export async function findCustomerByIdAndOrganizations(
  customerId: number,
  organizationIds: number[]
): Promise<CustomerRow | undefined> {
  const customer = await db
    .selectFrom("customer")
    .selectAll()
    .where("customerId", "=", customerId)
    .where("organizationId", "in", organizationIds)
    .executeTakeFirst();

  return customer;
}

export async function findCustomerByQuery(
  query: string
): Promise<CustomerRow[]> {
  const searchQuey = `%${query}%`;

  const customer = await db
    .selectFrom("customer")
    .selectAll()
    .where((eb) =>
      eb.or([
        eb("firstName", "like", searchQuey),
        eb("lastName", "like", searchQuey),
        eb("email", "like", searchQuey),
        eb("phoneNumber", "like", searchQuey),
        eb("taxNumber", "like", searchQuey),
      ])
    )
    .execute();
  return customer;
}

export async function updateCustomer(
  customerId: number,
  customer: UpdateCustomerRow
): Promise<CustomerRow> {
  const updatedCustomer = await db
    .updateTable("customer")
    .set(customer)
    .where("customerId", "=", customerId)
    .returningAll()
    .executeTakeFirstOrThrow();

  return updatedCustomer;
}
