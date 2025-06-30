import React from "react";

interface CubeCardProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

const CubeCard: React.FC<CubeCardProps> = ({ title = "Card", className, children }) => {
  return (
    <div className={`p-4 rounded-md border shadow bg-white ${className}`}>
      <h1 className="text-md font-bold mb-4">{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default CubeCard;
