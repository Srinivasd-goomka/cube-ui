import React, { useEffect, useState } from "react";
import cubeLogoImage from "../../assets/logos/cube-logo.png";
import { useAuthContext } from "../../hooks";
import IconMenu from "../../components/icons/IconMenu";
import IconMenuOpen from "../../components/icons/IconMenuOpen";
import SidenavShimmer from "../../components/sidenav/SidenavShimmer";
import { getInitials, getLocalStorage } from "../../lib/helpers";
import { CubeDropdown } from "../../components/ui/dropdown/CubeDropdown";
import { CircleUser, LogOut, Settings } from "lucide-react";

const Header: React.FC = () => {
  const { toggleSidenav, isSidenav, logout } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const storedUser = getLocalStorage("user") as {
        first_name?: string;
        last_name?: string;
        user_roles?: { role: { name: string } }[];
      };
      const initials = getInitials(
        `${storedUser?.first_name ?? ""} ${storedUser?.last_name ?? ""}`
      );
      const userRoles =
        storedUser?.user_roles?.map((ur) => ur.role?.name).filter(Boolean) ||
        [];
      const userFullname = `${storedUser?.first_name ?? ""} ${
        storedUser?.last_name ?? ""
      } ${userRoles.length > 0 ? `(${userRoles.join(", ")})` : ""}`;
      setUsername(initials);
      setUserRole(userFullname);
      setIsLoading(false);
    }, 500);
  }, []);

  const dropdownItems = [
    {
      label: userRole,
      onClick: () => console.log("Home clicked"),
      // icon: <CircleUser className="w-4 h-4" />,
      iconPosition: "left" as const,
    },
    {
      label: "My Profile",
      onClick: () => console.log("Home clicked"),
      icon: <CircleUser className="w-4 h-4" />,
      iconPosition: "left" as const,
    },
    {
      label: "Settings",
      onClick: () => console.log("Settings clicked"),
      icon: <Settings className="w-4 h-4" />,
      iconPosition: "left" as const,
    },
    {
      label: "Logout",
      onClick: logout,
      icon: <LogOut className="w-4 h-4" />,
      iconPosition: "left" as const,
    },
  ];

  return (
    <header className="fixed z-50 w-full bg-white shadow-sm px-2 py-1">
      <div className="flex justify-between items-center">
        <div className="flex flex-row">
          <div
            className="flex items-center mr-2"
            onClick={() => toggleSidenav()}
          >
            {isSidenav ? (
              <div>
                <IconMenuOpen />
              </div>
            ) : (
              <div>
                <IconMenu />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <img src={cubeLogoImage} alt="cube" height={46} width={65} />
            <div
              className="cube-logo-colors-line mt-1"
              style={{ height: 4 }}
            ></div>
          </div>
        </div>

        <div>
          {isLoading && (
            <div className="w-[150px] flex justify-between">
              {Array.from({ length: 2 }, (_, i) => (
                <SidenavShimmer key={i} />
              ))}
            </div>
          )}
        </div>

        {!isLoading && (
          <div className="flex justify-center items-center">
            <CubeDropdown items={dropdownItems} text={username} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
