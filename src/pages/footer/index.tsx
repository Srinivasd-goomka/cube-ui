import React from "react";
import goomkaLogoImage from "../../assets/logos/goomka-logo.png";
import ztersLogoImage from "../../assets/logos/zters.svg";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex justify-between border-0 border-t border-[#94a2bc80] z-10 bg-white">
      <div className="flex items-end p-2 gap-1">
        <img src={ztersLogoImage} alt="zters" width={32} height={35} />
        <span className="text-[12px] text-[#6c757d]">© {currentYear} ZTERS Inc. All Rights Reserved.</span>
      </div>
      <div className="flex items-end p-2 gap-1">
        <span className="text-[12px] text-[#6c757d]">Powered by</span>
        <img className="mb-[4px]" src={goomkaLogoImage} alt="goomka" height={32} />
      </div>
    </footer>
  );
};

export default Footer;
