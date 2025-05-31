import React from "react";
import cubeLogoImage from "../../assets/logos/cube-logo.png";
import { useAuthContext } from "../../hooks/use-authContext";
import IconMenu from "../../components/icons/IconMenu";
import IconMenuOpen from "../../components/icons/IconMenuOpen";

const Header: React.FC = () => {
  const { toggleSidenav, isSidenav } = useAuthContext();
  return (
    <header className="fixed z-10 w-full bg-white shadow-sm px-2 py-1">
      <div className="flex justify-between items-center">
        <div className="flex flex-row">
          <div
            className="flex items-center mr-2"
            onClick={() => toggleSidenav()}
          >
            {isSidenav ? <div><IconMenuOpen/></div> : <div><IconMenu/></div>}
          </div>
          <div className="flex flex-col">
            <img src={cubeLogoImage} alt="cube" height={46} width={65} />
            <div
              className="cube-logo-colors-line mt-1"
              style={{ height: 4 }}
            ></div>
          </div>
        </div>

        <div>GG</div>
      </div>
    </header>
  );
};

export default Header;
