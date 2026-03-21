import Link from 'next/link';

type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.href}>
          {breadcrumb.active ? (
            <span>{breadcrumb.label}</span>
          ) : (
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
          )}
          {index < breadcrumbs.length - 1 ? ' / ' : null}
        </span>
      ))}
    </nav>
  );
}