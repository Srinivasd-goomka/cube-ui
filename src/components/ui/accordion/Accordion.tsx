import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/helpers';


type AccordionItem = {
  label: string;
  content: React.ReactNode;
  value: string;
};

type AccordionProps = {
  items: AccordionItem[];
  multiple?: boolean;
  defaultValue?: string[]; // values to be expanded initially
  className?: string;
};

export function Accordion({
  items,
  multiple = false,
  defaultValue = [],
  className,
}: AccordionProps) {
  const [opened, setOpened] = useState<string[]>(defaultValue);

  const toggle = (value: string) => {
    setOpened((prev) =>
      multiple
        ? prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
        : prev.includes(value)
        ? []
        : [value]
    );
  };

  return (
    <div className={cn('divide-y border rounded-md', className)}>
      {items.map(({ value, label, content }) => {
        const isOpen = opened.includes(value);
        return (
          <div key={value}>
            <button
              onClick={() => toggle(value)}
              className="flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium hover:bg-gray-100 transition"
              aria-expanded={isOpen}
              aria-controls={`content-${value}`}
            >
              {label}
              <ChevronDown
                className={cn('w-4 h-4 transition-transform', {
                  'rotate-180': isOpen,
                })}
              />
            </button>

            <motion.div
              id={`content-${value}`}
              className="overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                height: isOpen ? 'auto' : 0,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden={!isOpen}
            >
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-gray-700">
                  {content}
                </div>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}




// import { CustomAccordion } from './CustomAccordion';

// export default function Example() {
//   const items = [
//     {
//       label: 'What is your return policy?',
//       value: 'return',
//       content: 'You can return any item within 30 days.',
//     },
//     {
//       label: 'Do you offer technical support?',
//       value: 'support',
//       content: 'Yes, we provide 24/7 support for premium users.',
//     },
//     {
//       label: 'Can I upgrade my plan later?',
//       value: 'upgrade',
//       content: 'Absolutely! You can upgrade anytime.',
//     },
//   ];

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <CustomAccordion items={items} multiple defaultValue={['support']} />
//     </div>
//   );
// }

