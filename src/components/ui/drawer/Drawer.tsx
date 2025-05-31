import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import clsx from 'clsx';

type DrawerProps = {
  opened: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: string; // e.g., "300px", "50%", etc.
  title?: string;
  withCloseButton?: boolean;
  overlayOpacity?: number;
  overlayColor?: string;
  children: React.ReactNode;
};

export function Drawer({
  opened,
  onClose,
  position = 'right',
  size = '300px',
  title,
  withCloseButton = true,
  overlayOpacity = 0.5,
  overlayColor = 'black',
  children,
}: DrawerProps) {
  useEffect(() => {
    if (opened) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  if (!opened) return null;

  const isHorizontal = position === 'left' || position === 'right';

  const positionClasses = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  const drawerStyle = isHorizontal
    ? { width: size }
    : { height: size };

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={clsx(
          'absolute bg-white shadow-xl overflow-auto transition-transform duration-300',
          positionClasses[position]
        )}
        style={drawerStyle}
      >
        {/* Header */}
        {(title || withCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b">
            {title && <h2 className="text-lg font-medium">{title}</h2>}
            {withCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}


// import { useState } from 'react';
// import { CustomDrawer } from './CustomDrawer';

// export default function DrawerDemo() {
//   const [opened, setOpened] = useState(false);

//   return (
//     <div>
//       <button
//         onClick={() => setOpened(true)}
//         className="px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         Open Drawer
//       </button>

//       <CustomDrawer
//         opened={opened}
//         onClose={() => setOpened(false)}
//         position="right"
//         size="400px"
//         title="My Drawer"
//         withCloseButton
//       >
//         <p>This is the drawer content.</p>
//       </CustomDrawer>
//     </div>
//   );
// }
