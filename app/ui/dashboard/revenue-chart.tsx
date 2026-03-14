import { fetchRevenue } from '../../lib/data';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();

  return (
    <div className="border rounded p-4">
      <h2 className="text-lg font-bold mb-2">Revenue Chart</h2>
      {revenue.map((item: any, i: number) => (
        <div key={i}>
          {item.month}: ${item.revenue}
        </div>
      ))}
    </div>
  );
}