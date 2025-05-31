import { ChevronRight } from 'lucide-react'; // Optional icon
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  active?: boolean;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
  linkComponent?: React.ElementType;
};

export function Breadcrumb({ items, className, }: BreadcrumbProps) {
  return (
    <nav className={clsx('text-sm text-gray-500', className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index !== 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="text-blue-600 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={clsx('font-medium', isLast ? 'text-gray-700' : 'text-gray-400')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function getBreadcrumbItems(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const items = segments.map((segment, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: idx < segments.length - 1 ? href : undefined, // Only add href if not last
    };
  });
  return items;
}

export function BreadcrumbFromPath() {
  const location = useLocation();
  const items = getBreadcrumbItems(location.pathname);

  return (
    <Breadcrumb
      items={items}
      linkComponent={Link}
    />
  );
}

{/* <Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings' }, // Active page (no href)
  ]}
/> */}