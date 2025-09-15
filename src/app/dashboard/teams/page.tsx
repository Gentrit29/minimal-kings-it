"use client";

import { useEffect, useState } from "react";

import AddRosterForm from "@/components/dashboard/teams/AddRosterForm";
import AddTeamForm from "@/components/dashboard/teams/AddTeamForm";
import TeamRow from "@/components/dashboard/teams/TeamRow";
import RosterRow from "@/components/dashboard/teams/RosterRow";

import { useAdmin, useLogout, useTeamsWithRosters } from "@/hooks";

import { RiAdminLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";

import { Roster, Team } from "@/lib/types";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";

import Button from "@/components/ui/Button";
import NavLink from "@/components/ui/Link";

export default function DashboardTeams() {
  const router = useRouter();

  const { isAuthenticated, isPending } = useAdmin();

  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      router.push("/");
    }
  }, [isAuthenticated, isPending, router]);

  const [toggleTeamForm, setToggleTeamForm] = useState(false);
  const [toggleRosterForm, setToggleRosterForm] = useState(false);

  const [openTeam, setOpenTeam] = useState<number | null>(null);
  const [selectedRoster, setSelectedRoster] = useState<Roster | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleEditRoster = (roster: Roster) => {
    setSelectedRoster(roster);
    setToggleRosterForm(true);
  };

  const handleEditTeam = (team: Team) => {
    setSelectedTeam(team);
    setToggleTeamForm(true);
  };

  const { data: teams } = useTeamsWithRosters();
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
          Teams Dashboard KL
        </h2>
        <div className="flex items-center justify-between gap-2 sm:ml-auto">
          <Button variant="primary" onClick={() => setToggleTeamForm(true)}>
            <IoIosAddCircleOutline className="h-6 w-6" /> Team
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setSelectedRoster(null);
              setToggleRosterForm(true);
            }}
          >
            <IoIosAddCircleOutline className="h-6 w-6" /> Roster
          </Button>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {teams?.map((team: Team) => (
          <div key={team.id}>
            <TeamRow
              key={team.name}
              team={team}
              open={openTeam === team.id}
              onToggle={() =>
                setOpenTeam(
                  openTeam !== null && openTeam === team.id ? null : team.id,
                )
              }
              onEditTeam={handleEditTeam}
            />
            {openTeam === team.id &&
              (team.roster && team.roster.length > 0 ? (
                <div className="mt-2 w-full space-y-2 rounded-md border border-neutral-600 bg-neutral-900 p-4">
                  {team.roster.map((r) => (
                    <RosterRow
                      key={r.id}
                      roster={r}
                      onEditRoster={handleEditRoster}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-2 w-full rounded-md border border-neutral-600 bg-neutral-900 p-4">
                  No Roster registered yet!
                </div>
              ))}
          </div>
        ))}
      </div>
      {toggleTeamForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AddTeamForm
            onToggleTeamForm={setToggleTeamForm}
            toggleTeamForm={toggleTeamForm}
            team={selectedTeam}
            setSelectedTeam={setSelectedTeam}
          />
        </div>
      )}
      {toggleRosterForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AddRosterForm
            onToggleRosterForm={setToggleRosterForm}
            toggleRosterForm={toggleRosterForm}
            roster={selectedRoster}
            setSelectedRoster={setSelectedRoster}
          />
        </div>
      )}
    </div>
  );
}
