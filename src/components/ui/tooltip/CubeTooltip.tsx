import { useState, useRef, type ReactNode } from 'react';

type TooltipProps = {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
};

export function CubeTooltip({ content, children, position = 'top', delay = 200 }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    timeout.current = setTimeout(() => setVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {visible && (
        <div
          className={`absolute z-10 px-2 py-1 text-xs text-white bg-black rounded shadow-lg whitespace-nowrap transition-opacity duration-200 opacity-100 ${positionClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
