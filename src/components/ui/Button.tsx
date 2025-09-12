import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "destructive" | "secondary";
  size?: "small" | "medium" | "large";
  className?: string;
  children: React.ReactNode;
}

const variants = {
  primary:
    "flex items-center gap-2 rounded-lg bg-yellow-500 text-white transition-transform duration-300 hover:bg-yellow-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neutral-500",
  destructive:
    "flex items-center gap-2 rounded-lg bg-red-600 transition-transform duration-300 hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400",
  secondary:
    "flex items-center gap-2 rounded-lg border border-neutral-600 transition-colors duration-200 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500",
};

const sizes = {
  small: "px-3 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-2.5 text-lg",
};

export default function Button({
  variant = "primary",
  size = "medium",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
