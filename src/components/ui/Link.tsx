import Link, { LinkProps } from "next/link";

interface NavLinkProps extends LinkProps<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "navigation" | "primary";
  size?: "small" | "medium" | "large";
}

const variants = {
  navigation:
    "flex items-center gap-2 rounded-lg border border-neutral-600 text-white transition-colors duration-200 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500",
  primary:
    "font-medium text-gray-300 transition-colors duration-200 hover:text-gray-200",
};

const sizes = {
  small: "px-3 py-1 text-base",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-2.5 text-lg",
};

export default function NavLink({
  href,
  children,
  className,
  variant = "primary",
  size = "medium",
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
