import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  FileText,
  Mail,
  ShoppingCart,
  Package,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/use-authContext";
import SidenavItem from "./SidenavItem";
import SidenavShimmer from "./SidenavShimmer";

interface SidebarProps {
  expandTrigger?: "click" | "hover";
  popoverTrigger?: "click" | "hover";
}

const Sidenav = ({
  expandTrigger = "click",
  popoverTrigger = "hover",
}: SidebarProps) => {
  const { isSidenav } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      title: "Dashboard",
      subItems: [
        { id: "analytics", title: "Analytics" },
        { id: "reports", title: "Reports" },
      ],
    },
    {
      id: "ecommerce",
      icon: ShoppingCart,
      title: "E-Commerce",
      subItems: [
        { id: "products", title: "Products" },
        { id: "orders", title: "Orders" },
        { id: "customers", title: "Customers" },
      ],
    },
    {
      id: "inventory",
      icon: Package,
      title: "Inventory",
      subItems: [
        { id: "stock", title: "Stock Management" },
        { id: "suppliers", title: "Suppliers" },
      ],
    },
    { id: "users", icon: Users, title: "Users" },
    { id: "documents", icon: FileText, title: "Documents" },
    { id: "messages", icon: Mail, title: "Messages" },
    { id: "notifications", icon: Bell, title: "Notifications" },
    { id: "settings", icon: Settings, title: "Settings" },
  ];

  const navigate = useNavigate();
  const goToPage = (link: string) => {
    setActiveItem(link);
    console.log(link);
    navigate("/sites/site/703");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div
        className={`
        h-screen bg-white border-r border-gray-200 transition-all duration-300 fixed
        ${isSidenav ? "w-16" : "w-64"}
      `}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <SidenavShimmer key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`
        h-screen bg-white border-r border-gray-200 transition-all duration-300 fixed z-20 ${
          isSidenav ? "w-16" : "w-64"
        }
      `}
    >
      <div className="flex flex-col h-full">
        <div className={`flex-1 py-4 ${!isSidenav ? "overflow-y-auto" : ""}`}>
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => (
              <SidenavItem
                key={item.id}
                icon={item.icon}
                title={item.title}
                isActive={activeItem === item.id}
                isCollapsed={isSidenav}
                subItems={item.subItems}
                onClick={() => !item.subItems && goToPage(item.id)}
                onSubItemClick={(subId) => goToPage(`${item.id}-${subId}`)}
                expandTrigger={expandTrigger}
                popoverTrigger={popoverTrigger}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
