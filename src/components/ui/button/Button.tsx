// import { useState } from "react";
import { cn } from "../../../lib/helpers";
import { ButtonLoader } from "../button-loader/ButtonLoader";

interface Props {
  label?: string;
  children?: React.ReactNode;
  variant?: "primary" | "success" | "info" | "warning" | "danger";
  type?: "button" | "submit" | "reset";
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  color?: string;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  type = "button",
  plain = false,
  round = false,
  circle = false,
  disabled = false,
  icon,
  label,
  color,
  isLoading = false,
  onClick,
  className,
}: Props) => {
  // const [rippleStyle, setRippleStyle] = useState({});

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled) return;
    const button = e.currentTarget;
    console.log(button)
    // const rect = button.getBoundingClientRect();
    // const size = Math.max(rect.width, rect.height);
    // const x = e.clientX - rect.left - size / 2;
    // const y = e.clientY - rect.top - size / 2;

    // setRippleStyle({
    //   width: size,
    //   height: size,
    //   left: x,
    //   top: y,
    //   animation: "animate-ripple 0.6s linear",
    // });

    // setTimeout(() => {
    //   setRippleStyle({});
    // }, 600);
    onClick?.();
  };

  const baseStyles =
    "relative overflow-hidden flex items-center justify-center transition duration-300 ease-in-out font-medium";

  const typeStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    info: "bg-cyan-600 text-white hover:bg-cyan-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const disabledStyle =
    disabled || isLoading
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : "";

  const shapeStyles = cn({
    "rounded-full": circle,
    "rounded-lg": round && !circle,
    "rounded-md": !round && !circle,
    "px-4 py-2": !circle,
    "p-2": circle,
  });

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      style={color ? { backgroundColor: color, color: "white" } : {}}
      className={cn(
        baseStyles,
        shapeStyles,
        plain ? "bg-transparent border" : typeStyles[variant],
        disabledStyle,
        className
      )}
    >
      {isLoading ? (
        <ButtonLoader />
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
          {label}
        </>
      )}
      {/* <span
        className="absolute bg-white/30 pointer-events-none animate-ripple"
        style={{ ...rippleStyle, borderRadius: "50%" }}
      /> */}
    </button>
  );
};

export default Button;
