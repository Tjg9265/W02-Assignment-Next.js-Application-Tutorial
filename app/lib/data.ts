import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

type Revenue = {
  month: string;
  revenue: number;
};

export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
export async function fetchLatestInvoices() {
  try {
    return [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    return {
      numberOfCustomers: 0,
      numberOfInvoices: 0,
      totalPaidInvoices: '$0',
      totalPendingInvoices: '$0',
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<{ id: string; name: string }[]>`
      SELECT id, name
      FROM customers
      ORDER BY name ASC
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      return null;
    }

    const data = await sql`
      SELECT
        id,
        customer_id,
        amount,
        status
      FROM invoices
      WHERE id = ${id}
      LIMIT 1
    `;

    return data[0] ?? null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const ITEMS_PER_PAGE = 6;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<{
      id: string;
      name: string;
      email: string;
      image_url: string;
      date: string;
      amount: number;
      status: 'pending' | 'paid';
    }[]>`
      SELECT
        invoices.id,
        customers.name,
        customers.email,
        customers.image_url,
        invoices.date,
        invoices.amount,
        invoices.status
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}