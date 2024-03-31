import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
}

const Boton: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  variant = "primary",
}) => {
  const baseStyles = "inline-flex items-center justify-center border font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  const sizeStyles = "text-sm px-4 py-2";
  const fullWidthStyles = fullWidth ? "w-full" : "";
  
  const variantStyles = {
    primary: "text-white bg-indigo-600 hover:bg-indigo-700 border-transparent",
    secondary: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 border-transparent",
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles} ${fullWidthStyles} ${variantStyles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Boton;
