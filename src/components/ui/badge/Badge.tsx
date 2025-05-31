
import { Check, X } from 'lucide-react'; 
import { cn } from '../../../lib/helpers';

type BadgeProps = {
  label: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray'; 
  size?: 'sm' | 'md' | 'lg'; 
  variant?: 'filled' | 'outline'; 
  icon?: 'check' | 'cross'; 
  className?: string;
  onClick?: () => void; 
};

export function Badge({
  label,
  color = 'blue',
  size = 'md',
  variant = 'filled',
  icon,
  className,
  onClick,
}: BadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    red: 'bg-red-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    gray: 'bg-gray-500 text-white',
  };

  const outlineColorClasses = {
    blue: 'border-blue-500 text-blue-500',
    green: 'border-green-500 text-green-500',
    red: 'border-red-500 text-red-500',
    yellow: 'border-yellow-500 text-yellow-500',
    gray: 'border-gray-500 text-gray-500',
  };

  const baseClasses = 'inline-flex items-center rounded-full font-semibold';

  const iconComponent = icon === 'check' ? (
    <Check className="w-4 h-4 mr-1" />
  ) : icon === 'cross' ? (
    <X className="w-4 h-4 mr-1" />
  ) : null;

  return (
    <div
      onClick={onClick}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variant === 'filled' ? colorClasses[color] : `border ${outlineColorClasses[color]}`,
        'cursor-pointer hover:opacity-80',
        className
      )}
    >
      {iconComponent}
      <span>{label}</span>
    </div>
  );
}



// import { Badge } from './Badge';

// export default function Example() {
//   return (
//     <div className="flex space-x-4">
//       <Badge label="New" color="blue" size="sm" />
//       <Badge label="Success" color="green" size="md" icon="check" />
//       <Badge label="Error" color="red" size="lg" icon="cross" variant="outline" />
//       <Badge label="Pending" color="yellow" size="sm" />
//       <Badge label="Info" color="gray" size="md" onClick={() => alert('Badge clicked!')} />
//     </div>
//   );
// }
