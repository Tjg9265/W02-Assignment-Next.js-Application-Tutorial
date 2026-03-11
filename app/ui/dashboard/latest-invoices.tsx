type Invoice = {
  name: string;
  email: string;
  amount: number;
};

export default function LatestInvoices({ latestInvoices }: { latestInvoices: Invoice[] }) {
  return (
    <div className="border rounded p-4">
      <h2 className="text-lg font-bold mb-2">Latest Invoices</h2>
      {latestInvoices.map((invoice, i) => (
        <div key={i} className="text-sm">
          {invoice.name} — ${invoice.amount}
        </div>
      ))}
    </div>
  );
}