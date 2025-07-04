import React from "react";

interface CubeCardProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

const CubeCard: React.FC<CubeCardProps> = ({
  title = "",
  className,
  children,
}) => {
  return (
    <div className={`rounded-md border shadow bg-white ${className}`}>
      {title && (
        <h1 className="text-md font-bold mb-4 text-slategray">{title}</h1>
      )}
      <div>{children}</div>
    </div>
  );
};

export default CubeCard;
