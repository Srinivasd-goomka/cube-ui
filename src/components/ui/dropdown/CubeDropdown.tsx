import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/helpers";
import { ChevronDown } from "lucide-react";
import { CubeAvatar } from "../avatar/CubeAvatar";
import { useClickOutside } from "../../../hooks";

type DropdownItem = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

type DropdownProps = {
  text?: string;
  items: DropdownItem[];
  className?: string;
};

export function CubeDropdown({ text, items, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen && dropdownRef.current && buttonRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      const fitsRight = buttonRect.left + dropdownRect.width <= screenWidth;

      setPositionStyle(
        fitsRight
          ? {
              top: `${buttonRef.current.offsetHeight}px`,
              left: "0",
              transform: "none",
            }
          : {
              top: `${buttonRef.current.offsetHeight}px`,
              right: "0",
              left: "auto",
              transform: "none",
            }
      );
    }
  }, [isOpen]);

  useClickOutside(
    () => {
      setIsOpen(false);
    },
    undefined,
    [dropdownRef]
  );

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 transition duration-300"
      >
        <CubeAvatar initials={text} />
        {/* <span>{text}</span> */}
        <ChevronDown className="text-gray-400"/>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            style={positionStyle}
            className={cn(
              "absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10",
              className
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="py-2">
              {items.map(
                ({ label, onClick, icon, iconPosition = "left" }, index) => (
                  <li
                    key={index}
                    onClick={onClick}
                    className="px-4 py-3 text-sm text-slategray hover:bg-gray-100 cursor-pointer flex items-center space-x-2 border-b last:border-b-0"
                  >
                    {icon && iconPosition === "left" && (
                      <span className="mr-2">{icon}</span>
                    )}
                    <span>{label}</span>
                    {icon && iconPosition === "right" && (
                      <span className="ml-2">{icon}</span>
                    )}
                  </li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
