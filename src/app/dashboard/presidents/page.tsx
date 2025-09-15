"use client";

import { useEffect, useState } from "react";

import {
  useAdmin,
  useDeletePresident,
  useLogout,
  usePresidents,
} from "@/hooks";

import { RiAdminLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";

import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";

import Button from "@/components/ui/Button";
import NavLink from "@/components/ui/Link";
import AddPresidentForm from "@/components/dashboard/presidents/AddPresidentForm";
import { President } from "@/lib/types";
import PresidentCard from "@/components/PresidentCard";

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
        <NavLink href="/" variant="navigation">
          <GoArrowLeft />
          Home
        </NavLink>
        <Button variant="secondary" onClick={() => logoutMutation()}>
          <CiLogout className="h-6 w-6" />
          Logout
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <h2 className="flex w-full items-center gap-2 rounded-lg border border-neutral-600 px-4 py-2 sm:w-fit">
          <RiAdminLine />
          Presidents Dashboard KL
        </h2>
        <Button
          variant="primary"
          className="sm:ml-auto"
          onClick={() => setTogglePresidentForm(true)}
        >
          <IoIosAddCircleOutline className="h-6 w-6" /> President
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {presidents?.map((president: President) => (
          <PresidentCard key={president.id} president={president}>
            <Button
              variant="primary"
              size="small"
              onClick={() => handleEditPresident(president)}
            >
              Modifica
            </Button>
            <Button
              variant="destructive"
              size="small"
              onClick={() => deletePresidentMutation(president.id)}
            >
              Elimina
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
