"use client";

import { useAdmin, useLogout } from "@/hooks";

import Image from "next/image";

import { CiLogin, CiLogout, CiMenuFries } from "react-icons/ci";

import { Button } from "../ui/Button";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";

export default function Header() {
  const { isAuthenticated } = useAdmin();
  const { logoutMutation } = useLogout();

  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  return (
    <header className="border-border bg-background relative z-40 h-20 border-b px-8">
      <nav className="flex h-full items-center gap-2">
        <Link href="/">
          <Image
            src="/favicon.png"
            alt="logo-navbar"
            width={35}
            height={35}
            className="transition-transform duration-300 hover:scale-110"
          />
        </Link>
        {/* Desktop Links */}
        <div className="hidden gap-2 md:flex">
          <Button asChild variant="ghost">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/teams">Squadre</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/presidents">Presidenti</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/rosters">Rosters</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/splits">Splits</Link>
          </Button>
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Dashboard</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/teams">Squadre</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/presidents">Presidenti</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/splits">Splits</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="ml-auto hidden gap-2 md:flex">
          <ModeToggle />
          {!isAuthenticated ? (
            <Button asChild variant="default">
              <Link href="/sign-in">
                <CiLogin className="h-6 w-6" />
                Login
              </Link>
            </Button>
          ) : (
            <Button variant="outline" onClick={() => logoutMutation()}>
              <CiLogout className="h-6 w-6" />
              Logout
            </Button>
          )}
        </div>
        {/* Mobile Toggle */}
        <div className="ml-auto flex gap-2 md:hidden">
          <ModeToggle />
          <button
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            aria-label="toggle menu"
            aria-expanded={isOpenMobile}
          >
            <CiMenuFries className="h-6 w-6" />
          </button>
        </div>
        {/* Mobile links */}
        {isOpenMobile && (
          <div className="bg-background border-border absolute top-full left-0 z-20 flex w-full flex-col items-start gap-2 border-y px-4 py-2 md:hidden">
            <Button asChild variant="ghost">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/teams">Squadre</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/presidents">Presidenti</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/rosters">Rosters</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/splits">Splits</Link>
            </Button>
            {isAuthenticated && (
              <div className="w-40">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                >
                  Dashboard
                </Button>
                {isDashboardOpen && (
                  <div className="border-border mt-1 flex flex-col rounded-md border">
                    <Button
                      asChild
                      variant="ghost"
                      className="rounded-none border-b border-neutral-700"
                    >
                      <Link href="/dashboard/teams" className="py-1">
                        Squadre
                      </Link>
                    </Button>
                    <Button asChild variant="ghost">
                      <Link href="/dashboard/presidents" className="py-1">
                        Presidenti
                      </Link>
                    </Button>
                    <Button asChild variant="ghost">
                      <Link href="/dashboard/splits" className="py-1">
                        Splits
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
            {!isAuthenticated ? (
              <Button asChild variant="default">
                <Link href="/sign-in">
                  <CiLogin className="h-4 w-4 md:h-6 md:w-6" />
                  Login
                </Link>
              </Button>
            ) : (
              <Button variant="outline" onClick={() => logoutMutation()}>
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
