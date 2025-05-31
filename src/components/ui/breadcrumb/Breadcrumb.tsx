import { ChevronRight } from 'lucide-react'; // Optional icon
import type { ReactNode } from 'react';
import clsx from 'clsx';

type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  active?: boolean;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={clsx('text-sm text-gray-500', className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index !== 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="text-blue-600 hover:underline"
                >
                  {item.label}
                </a>
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

{/* <Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings' }, // Active page (no href)
  ]}
/> */}