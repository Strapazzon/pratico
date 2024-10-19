import { db } from "@database/index";
import { CustomerRow, InsertCustomerRow } from "@database/tables/customerTable";

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
