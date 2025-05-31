import React, { useState, useRef } from "react";
import { LucideIcon, ChevronDown } from "lucide-react";
import "./SidenavItem.css";
// import { Link } from "react-router-dom";
interface SubItem {
  id: string;
  title: string;
}

interface SidenavItemProps {
  icon: LucideIcon;
  title: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  subItems?: SubItem[];
  onClick?: () => void;
  onSubItemClick?: (id: string) => void;
  expandTrigger?: "click" | "hover";
  popoverTrigger?: "click" | "hover";
}

const SidenavItem = ({
  icon: Icon,
  title,
  isActive = false,
  isCollapsed = false,
  subItems = [],
  onClick,
  onSubItemClick,
  expandTrigger = "click",
  popoverTrigger = "hover",
}: SidenavItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const hasSubItems = subItems.length > 0;

  const handleMouseEnter = () => {
    if (isCollapsed && hasSubItems && popoverTrigger === "hover") {
      setShowPopover(true);
    }
    if (!isCollapsed && hasSubItems && expandTrigger === "hover") {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const rect = itemRef.current?.getBoundingClientRect();
    if (!rect) return;

    const isLeavingToPopover =
      e.clientX > rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isLeavingToPopover) {
      if (isCollapsed && hasSubItems && popoverTrigger === "hover") {
        setShowPopover(false);
      }
      if (!isCollapsed && hasSubItems && expandTrigger === "hover") {
        setIsExpanded(false);
      }
    }
  };

  const handleClick = () => {
    if (hasSubItems) {
      if (isCollapsed && popoverTrigger === "click") {
        setShowPopover(!showPopover);
      } else if (!isCollapsed && expandTrigger === "click") {
        setIsExpanded(!isExpanded);
      }
    } else {
      onClick?.();
    }
  };

  return (
    <div
      ref={itemRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className={`
         nav-button w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
          ${
            isActive
              ? "bg-indigo-100 text-indigo-600"
              : "text-gray-600 hover:bg-gray-100"
          }
        `}
      >
        {isCollapsed && !hasSubItems && (
          <span className="nav-tooltip">{title}</span>
        )}
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!isCollapsed && (
          <>
            <span className="text-sm font-medium flex-grow text-left">
              {title}
            </span>
            {hasSubItems && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            )}
          </>
        )}
      </button>

      {/* Popover for collapsed state */}
      {isCollapsed && showPopover && hasSubItems && (
        <div
          className="popover-transform fixed ml-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
          style={{
            left: `${
              (itemRef.current?.getBoundingClientRect().right ?? 0) + 8
            }px`,
            top: `${itemRef.current?.getBoundingClientRect().top ?? 0}px`,
          }}
          onMouseEnter={() => setShowPopover(true)}
          onMouseLeave={() =>
            popoverTrigger === "hover" && setShowPopover(false)
          }
        >
          <div className="px-3 py-2 font-medium text-sm text-gray-900 border-b border-gray-100">
            {title}
          </div>
          {subItems.map((item) => (
            // <Link to="/video">
              <button
                key={item.id}
                onClick={() => {
                  onSubItemClick?.(item.id);
                  setShowPopover(false);
                }}
                className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 text-left"
              >
                {item.title}
              </button>
            // </Link>
          ))}
        </div>
      )}

      {/* Expanded subitems for non-collapsed state */}
      {!isCollapsed && isExpanded && hasSubItems && (
        <div className="ml-6 mt-1 space-y-1">
          {subItems.map((item) => (
            // <Link to="/video">
              <button
                key={item.id}
                onClick={() => onSubItemClick?.(item.id)}
                className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg text-left"
              >
                {item.title}
              </button>
            // </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidenavItem;
