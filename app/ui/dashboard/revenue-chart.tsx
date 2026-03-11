type Revenue = {
  month: string;
  revenue: number;
};

export default function RevenueChart({ revenue }: { revenue: Revenue[] }) {
  return (
    <div className="border rounded p-4">
      <h2 className="text-lg font-bold mb-2">Revenue Chart</h2>

      {revenue.map((item, i) => (
        <div key={i} className="text-sm">
          {item.month}: ${item.revenue}
        </div>
      ))}
    </div>
  );
}