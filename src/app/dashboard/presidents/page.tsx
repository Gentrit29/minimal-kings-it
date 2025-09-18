"use client";

import { useEffect, useState } from "react";

import {
  useAdmin,
  useDeletePresident,
  useLogout,
  usePresidents,
} from "@/hooks";

import { useRouter } from "next/navigation";

import AddPresidentForm from "@/components/dashboard/presidents/AddPresidentForm";

import { President } from "@/lib/types";

import PresidentCard from "@/components/shared/PresidentCard";

import { Button } from "@/components/ui/Button";

import {
  ArrowLeft,
  CirclePlus,
  LogOut,
  Pencil,
  Trash,
  UserStar,
} from "lucide-react";

import Link from "next/link";

export default function DashboardPresidents() {
  const router = useRouter();

  const { isAuthenticated, isPending } = useAdmin();

  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      router.push("/");
    }
  }, [isAuthenticated, isPending, router]);

  const [togglePresidentForm, setTogglePresidentForm] = useState(false);

  const [selectedPresident, setSelectedPresident] = useState<President | null>(
    null,
  );

  const { deletePresidentMutation } = useDeletePresident();

  const handleEditPresident = (president: President) => {
    setSelectedPresident(president);
    setTogglePresidentForm(true);
  };

  const { data: presidents } = usePresidents();
  const { logoutMutation } = useLogout();

  return (
    <div className="space-y-2 px-8 py-10">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft />
            Home
          </Link>
        </Button>
        <Button variant="outline" onClick={() => logoutMutation()}>
          <LogOut />
          Logout
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <h2 className="border-border flex w-full items-center gap-2 rounded-lg border px-4 py-2 sm:w-fit">
          <UserStar />
          Dashboard Presidenti KL
        </h2>
        <Button
          variant="default"
          className="ml-auto w-full sm:w-fit"
          onClick={() => {
            setSelectedPresident(null);
            setTogglePresidentForm(true);
          }}
        >
          <CirclePlus /> Presidente
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {presidents?.map((president: President) => (
          <PresidentCard key={president.id} president={president}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEditPresident(president)}
            >
              <Pencil />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => deletePresidentMutation(president.id!)}
            >
              <Trash />
            </Button>
          </PresidentCard>
        ))}
      </div>
      {togglePresidentForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AddPresidentForm
            onTogglePresidentForm={setTogglePresidentForm}
            togglePresidentForm={togglePresidentForm}
            president={selectedPresident}
            setSelectedPresident={setSelectedPresident}
          />
        </div>
      )}
    </div>
  );
}
