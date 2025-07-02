import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  height?: number | string;
  width?: number | string;
  radius?: number | string;
};

export function CubeSkeleton({
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