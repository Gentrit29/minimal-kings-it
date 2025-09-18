"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AddRosterForm from "@/components/dashboard/teams/AddRosterForm";
import AddTeamForm from "@/components/dashboard/teams/AddTeamForm";
import TeamRow from "@/components/dashboard/teams/TeamRow";
import RosterRow from "@/components/dashboard/teams/RosterRow";

import { useAdmin, useLogout, useTeamsWithRosters } from "@/hooks";

import { Roster, Team } from "@/lib/types";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";

import { ArrowLeft, CirclePlus, LogOut, UserStar } from "lucide-react";

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

  const [openTeam, setOpenTeam] = useState<number | undefined>(undefined);
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
          Dashboard Squadre KL
        </h2>
        <div className="flex items-center justify-between gap-2 sm:ml-auto">
          <Button variant="default" onClick={() => setToggleTeamForm(true)}>
            <CirclePlus /> Squadra
          </Button>
          <Button
            variant="default"
            onClick={() => {
              setSelectedRoster(null);
              setToggleRosterForm(true);
            }}
          >
            <CirclePlus /> Roster
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
                  openTeam !== null && openTeam === team.id
                    ? undefined
                    : team.id,
                )
              }
              onEditTeam={handleEditTeam}
            />
            {openTeam === team.id &&
              (team.roster && team.roster.length > 0 ? (
                <div className="bg-card mt-2 w-full space-y-2 rounded-md border p-4">
                  {team.roster.map((r) => (
                    <RosterRow
                      key={r.id}
                      roster={r}
                      onEditRoster={handleEditRoster}
                    />
                  ))}
                </div>
              ) : (
                <div className="border-border bg-card mt-2 w-full rounded-md border p-4">
                  Lista vuota per il momento!
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
