import Link from 'next/link';
import { updateInvoice } from '../../lib/actions';
import { CustomerField } from '../../lib/definitions';

type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  return (
    <form action={updateInvoiceWithId} className="space-y-4">
      <div>
        <label htmlFor="customerId">Customer</label>
        <select
          id="customerId"
          name="customerId"
          defaultValue={invoice.customer_id}
          required
        >
          <option value="" disabled>
            Select a customer
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          defaultValue={invoice.amount / 100}
          required
        />
      </div>

      <div>
        <span>Status</span>
        <div>
          <label>
            <input
              type="radio"
              name="status"
              value="pending"
              defaultChecked={invoice.status === 'pending'}
              required
            />
            Pending
          </label>

          <label>
            <input
              type="radio"
              name="status"
              value="paid"
              defaultChecked={invoice.status === 'paid'}
            />
            Paid
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/dashboard/invoices">Cancel</Link>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
}