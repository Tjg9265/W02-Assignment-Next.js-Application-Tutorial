import { lusitana } from '@/app/ui/fonts';
import {
  InboxIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { fetchCardData } from '@/app/lib/data';

type CardType = 'collected' | 'pending' | 'totalInvoices' | 'totalCustomers';

type CardData = {
  numberOfInvoices: number;
  numberOfCustomers: number;
  totalPaidInvoices: string;
  totalPendingInvoices: string;
};

const iconMap: Record<CardType, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  collected: InboxIcon,
  pending: ClockIcon,
  totalInvoices: DocumentIcon,
  totalCustomers: UserGroupIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  }: CardData = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="totalInvoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="totalCustomers" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: string | number;
  type: CardType;
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={clsx(
          'truncate rounded-xl bg-white px-4 py-8 text-center text-2xl',
          lusitana.className,
        )}
      >
        {value}
      </p>
    </div>
  );
}