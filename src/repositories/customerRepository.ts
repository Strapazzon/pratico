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
  organizationIds: number[],
  customer: UpdateCustomerRow
): Promise<CustomerRow> {
  const updatedCustomer = await db
    .updateTable("customer")
    .set(customer)
    .where("customerId", "=", customerId)
    .where("organizationId", "in", organizationIds)
    .returningAll()
    .executeTakeFirstOrThrow();

  return updatedCustomer;
}

export async function listCustomersByOrganizationIds(
  organizationIds: number[],
  page = 1,
  perPage = 10
): Promise<CustomerRow[]> {
  const offset = (page - 1) * perPage;

  const customers = await db
    .selectFrom("customer")
    .selectAll()
    .limit(perPage)
    .offset(offset)
    .where("organizationId", "in", organizationIds)
    .execute();

  return customers;
}

export async function countCustomersByOrganizationIds(
  organizationIds: number[]
): Promise<number> {
  const { count } = await db
    .selectFrom("customer")
    .select(db.fn.count<number>("customerId").as("count"))
    .where("organizationId", "in", organizationIds)
    .executeTakeFirstOrThrow();

  return count;
}

export async function searchCustomersByOrganizationIds(
  organizationIds: number[],
  search: string,
  page = 1,
  perPage = 10
) {
  const offset = (page - 1) * perPage;
  const searchQuery = `%${search}%`;

  const customers = await db
    .selectFrom("customer")
    .selectAll()
    .limit(perPage)
    .offset(offset)
    .where("organizationId", "in", organizationIds)
    .where((eb) =>
      eb.or([
        eb("firstName", "like", searchQuery),
        eb("lastName", "like", searchQuery),
        eb("email", "like", searchQuery),
        eb("phoneNumber", "like", searchQuery),
        eb("taxNumber", "like", searchQuery),
      ])
    )
    .execute();

  const rowCount = await db
    .selectFrom("customer")
    .select(db.fn.count<number>("customerId").as("count"))
    .where("organizationId", "in", organizationIds)
    .where((eb) =>
      eb.or([
        eb("firstName", "like", searchQuery),
        eb("lastName", "like", searchQuery),
        eb("email", "like", searchQuery),
        eb("phoneNumber", "like", searchQuery),
        eb("taxNumber", "like", searchQuery),
      ])
    )
    .executeTakeFirstOrThrow();

  const totalPages = Math.ceil(rowCount.count / perPage);

  return { rowCount: rowCount.count, customers, totalPages };
}
