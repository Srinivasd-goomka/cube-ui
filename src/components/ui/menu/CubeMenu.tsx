import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/helpers';


type MenuItem = {
  label: string;
  onClick: () => void;
};

type MenuProps = {
  items: MenuItem[];
  children: React.ReactNode;
  className?: string;
};

export function CubeMenu({ items, children, className }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Calculate menu position based on available space
  const calculatePosition = () => {
    if (!menuRef.current) return { top: '100%', left: '0' };

    const rect = menuRef.current.getBoundingClientRect();
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    // Auto position: if there isn't enough space below, open above.
    const topPosition = rect.bottom + rect.height <= screenHeight ? '100%' : '-100%';
    const leftPosition = rect.left + rect.width / 2 <= screenWidth ? '50%' : 'auto';

    return { top: topPosition, left: leftPosition };
  };

  const position = calculatePosition();

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        {children}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className={cn(
              'absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10',
              className
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            style={{
              top: position.top,
              left: position.left,
              transform: 'translateX(-50%)',
            }}
          >
            <ul className="py-2">
              {items.map(({ label, onClick }, index) => (
                <li
                  key={index}
                  onClick={onClick}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



// import { CustomMenu } from './CustomMenu';

// export default function Example() {
//   const items = [
//     { label: 'Profile', onClick: () => console.log('Profile clicked') },
//     { label: 'Settings', onClick: () => console.log('Settings clicked') },
//     { label: 'Logout', onClick: () => console.log('Logout clicked') },
//   ];

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <CustomMenu items={items}>
//         <span>Open Menu</span>
//       </CustomMenu>
//     </div>
//   );
// }
