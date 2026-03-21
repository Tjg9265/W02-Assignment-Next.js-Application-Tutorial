import { lusitana } from '@/app/ui/fonts';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { fetchRevenue } from '@/app/lib/data';

type Revenue = {
  month: string;
  revenue: number;
};

export default async function RevenueChart() {
  const revenue: Revenue[] = await fetchRevenue();

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {revenue.map((month) => (
            <div
              key={month.month}
              className="mb-6 flex flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(month.revenue / 1000) * 20}px`,
                }}
              />
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}