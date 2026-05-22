import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent-cyan" | "accent-magenta" | "accent-yellow";
  children: React.ReactNode;
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  let variantClasses = "";
  
  switch (variant) {
    case "accent-cyan":
      variantClasses = "hover:bg-[var(--color-print-cyan)] hover:text-white";
      break;
    case "accent-magenta":
      variantClasses = "hover:bg-[var(--color-print-magenta)] hover:text-white";
      break;
    case "accent-yellow":
      variantClasses = "hover:bg-[var(--color-print-yellow)] hover:text-white";
      break;
    case "secondary":
      variantClasses = "hover:bg-black hover:text-white";
      break;
    case "primary":
    default:
      variantClasses = "hover:bg-black hover:text-white";
      break;
  }

  return (
    <button
      className={`bg-white text-black border-2 border-black font-bold uppercase transition-colors duration-300 px-6 py-3 md:px-8 md:py-4 ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
