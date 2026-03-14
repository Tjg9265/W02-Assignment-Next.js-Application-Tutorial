import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@nextmail.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Héctor Simpson',
    email: 'hector@nextmail.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Evil Rabbit',
    email: 'evil@nextmail.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Amy Burns',
    email: 'amy@nextmail.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '47c2a1f9-0bde-4f0c-8b8b-9c8f7d2e4f1a',
    name: 'Balázs Orbán',
    email: 'balazs@nextmail.com',
    image_url: '/customers/balazs-orban.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Delba de Oliveira',
    email: 'delba@nextmail.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
];

const invoices = [
  {
    customer_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: '47c2a1f9-0bde-4f0c-8b8b-9c8f7d2e4f1a',
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: '47c2a1f9-0bde-4f0c-8b8b-9c8f7d2e4f1a',
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    amount: 8945,
    status: 'paid',
    date: '2024-06-03',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

async function seedUsers(client: any) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await client.sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

async function seedCustomers(client: any) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  for (const customer of customers) {
    await client.sql`
      INSERT INTO customers (id, name, email, image_url)
      VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

async function seedInvoices(client: any) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  for (const invoice of invoices) {
    await client.sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
      ON CONFLICT DO NOTHING;
    `;
  }
}

async function seedRevenue(client: any) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  for (const rev of revenue) {
    await client.sql`
      INSERT INTO revenue (month, revenue)
      VALUES (${rev.month}, ${rev.revenue})
      ON CONFLICT (month) DO NOTHING;
    `;
  }
}

export async function GET() {
  const client = await db.connect();

  try {
    await client.sql`BEGIN`;
    await seedUsers(client);
    await seedCustomers(client);
    await seedInvoices(client);
    await seedRevenue(client);
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.error(error);
    return Response.json({ error: 'Seeding failed' }, { status: 500 });
  } finally {
    client.release();
  }
}