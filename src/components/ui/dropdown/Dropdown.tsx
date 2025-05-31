import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/helpers';


type DropdownItem = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right'; // NEW: Icon position option
};

type DropdownProps = {
  username: string;
  items: DropdownItem[];
  className?: string;
};

export function Dropdown({
  username,
  items,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const calculatePosition = () => {
    if (!dropdownRef.current) return { top: '100%', left: '0' };

    const rect = dropdownRef.current.getBoundingClientRect();
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    const topPosition = rect.bottom + rect.height <= screenHeight ? '100%' : '-100%';
    const leftPosition = rect.left + rect.width / 2 <= screenWidth ? '50%' : 'auto';

    return { top: topPosition, left: leftPosition };
  };

  const position = calculatePosition();

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        <span>{username}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
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
              {items.map(({ label, onClick, icon, iconPosition = 'left' }, index) => (
                <li
                  key={index}
                  onClick={onClick}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                >
                  {icon && iconPosition === 'left' && (
                    <span className="mr-2">{icon}</span>
                  )}
                  <span>{label}</span>
                  {icon && iconPosition === 'right' && (
                    <span className="ml-2">{icon}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}





// import { IdentityDropdown } from './IdentityDropdown';
// import { Home, Settings, LogOut } from 'lucide-react'; // Example icons from lucide-react

// export default function Example() {
//   const handleLogout = () => {
//     console.log('User logged out');
//     // Add your logout logic here (e.g., clearing user session, redirecting)
//   };

//   const items = [
//     {
//       label: 'Home',
//       onClick: () => console.log('Home clicked'),
//       icon: <Home className="w-4 h-4" />,
//       iconPosition: 'left',
//     },
//     {
//       label: 'Settings',
//       onClick: () => console.log('Settings clicked'),
//       icon: <Settings className="w-4 h-4" />,
//       iconPosition: 'left',
//     },
//     {
//       label: 'Logout',
//       onClick: handleLogout,
//       icon: <LogOut className="w-4 h-4" />,
//       iconPosition: 'right',
//     },
//   ];

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <IdentityDropdown username="John Doe" items={items} />
//     </div>
//   );
// }
