import Form from '../../../../ui/invoices/edit-form';
import Breadcrumbs from '../../../../ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '../../../../lib/data';
import { notFound } from 'next/navigation';
import { CustomerField } from '../../../../lib/definitions';
import type { Metadata } from 'next';

type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        invoice={invoice as InvoiceForm}
        customers={customers as CustomerField[]}
      />
    </main>
  );
}