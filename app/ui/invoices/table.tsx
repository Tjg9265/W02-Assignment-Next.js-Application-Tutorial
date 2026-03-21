import { UpdateInvoice, DeleteInvoice } from './buttons';
import { fetchFilteredInvoices } from '../../lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <table>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.id}</td>
            <td>{invoice.name}</td>
            <td>{invoice.amount}</td>
            <td>
              <UpdateInvoice id={invoice.id} />
              <DeleteInvoice id={invoice.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}