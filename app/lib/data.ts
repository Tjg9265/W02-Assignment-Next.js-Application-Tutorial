import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql`SELECT * FROM revenue`;

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