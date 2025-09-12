"use client";

import { useAdmin, useLogout } from "@/hooks";

import Image from "next/image";

import { CiLogin, CiLogout, CiMenuFries } from "react-icons/ci";

import Button from "./ui/Button";
import NavLink from "./ui/Link";
import { useState } from "react";

export default function Header() {
  const { isAuthenticated } = useAdmin();
  const { logoutMutation } = useLogout();

  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <header className="relative z-40 h-20 border-b border-neutral-700 px-8 py-4 backdrop-blur-sm">
      <nav className="flex h-full items-center">
        <NavLink href="/" variant="primary">
          <Image
            src="/favicon.png"
            alt="logo-navbar"
            width={35}
            height={35}
            className="transition-transform duration-300 hover:scale-110"
          />
        </NavLink>
        {/* Desktop Links */}
        <div className="hidden gap-2 md:flex">
          <NavLink href="/" variant="primary">
            Home
          </NavLink>
          <NavLink href="/teams" variant="primary">
            Squadre
          </NavLink>
          {isAuthenticated && (
            <NavLink href="/dashboard" variant="primary">
              Dashboard
            </NavLink>
          )}
        </div>
        <div className="ml-auto flex gap-3">
          <div className="hidden md:flex">
            {!isAuthenticated ? (
              <NavLink href="/sign-in" variant="navigation">
                <CiLogin className="h-6 w-6" />
                Login
              </NavLink>
            ) : (
              <Button variant="secondary" onClick={() => logoutMutation()}>
                <CiLogout className="h-6 w-6" />
                Logout
              </Button>
            )}
          </div>
          {/* Mobile Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpenMobile(!isOpenMobile)}
              aria-label="toggle menu"
              aria-expanded={isOpenMobile}
            >
              <CiMenuFries className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Mobile links */}
        {isOpenMobile && (
          <div className="absolute top-full left-0 flex w-full flex-col gap-2 border-y border-neutral-700 bg-neutral-900/70 p-4 md:hidden">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/teams">Squadre</NavLink>
            {isAuthenticated && <NavLink href="/dashboard">Dashboard</NavLink>}
            {!isAuthenticated ? (
              <NavLink
                href="/sign-in"
                variant="navigation"
                className="w-fit"
                size="small"
              >
                <CiLogin className="h-4 w-4 md:h-6 md:w-6" />
                Login
              </NavLink>
            ) : (
              <Button
                variant="secondary"
                className="w-fit"
                onClick={() => logoutMutation()}
              >
                <CiLogout className="h-6 w-6" />
                Logout
              </Button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
