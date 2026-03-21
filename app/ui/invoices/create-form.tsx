'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createInvoice, type State } from '../../lib/actions';
import { CustomerField } from '../../lib/definitions';

export default function Form({
  customers,
}: {
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="customerId">Customer</label>
        <select
          id="customerId"
          name="customerId"
          defaultValue=""
          aria-describedby="customer-error"
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
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.customerId?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          aria-describedby="amount-error"
        />
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {state.errors?.amount?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <fieldset>
          <legend>Status</legend>
          <label>
            <input type="radio" name="status" value="pending" />
            Pending
          </label>
          <label>
            <input type="radio" name="status" value="paid" />
            Paid
          </label>
        </fieldset>
        <div id="status-error" aria-live="polite" aria-atomic="true">
          {state.errors?.status?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {state.message ? <p>{state.message}</p> : null}
      </div>

      <div>
        <Link href="/dashboard/invoices">Cancel</Link>
        <button type="submit">Create Invoice</button>
      </div>
    </form>
  );
}