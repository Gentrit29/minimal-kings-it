"use client";

import Header from "@/components/shared/Header";
import { useAdmin } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isPending } = useAdmin();

  if (pathname === "/sign-in") {
    if (isAuthenticated) {
      router.push("/");
      return null;
    }
    return <>{children}</>;
  }

  if (!isAuthenticated && !isPending) {
    router.push("/sign-in");
    return null;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
