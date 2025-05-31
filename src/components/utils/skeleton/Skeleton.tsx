import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  height?: number | string;
  width?: number | string;
  radius?: number | string;
};

export function Skeleton({
  height = 16,
  width = '100%',
  radius = 4,
  className,
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200 dark:bg-gray-700',
        className
      )}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
        borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
      }}
      {...rest}
    />
  );
}

{/* <Skeleton height={20} width={200} />
<Skeleton height="2rem" radius="8px" /> */}