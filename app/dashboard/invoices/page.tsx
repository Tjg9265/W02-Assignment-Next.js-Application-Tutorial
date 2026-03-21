

import Search from '../../ui/search';
import InvoicesTable from '../../ui/invoices/table';
import { CreateInvoice } from '../../ui/invoices/buttons';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main>
      <div className="flex items-center justify-between gap-2 md:mt-4">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>

      <InvoicesTable query={query} currentPage={currentPage} />
    </main>
  );
}