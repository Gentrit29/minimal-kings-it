"use client";

import RosterFilter from "@/components/RosterFilter";
import RosterSkeleton from "@/components/RosterSkeleton";
import RosterCard from "@/components/shared/RosterCard";

import { useFilteredRoster, useTeamsWithRosters } from "@/hooks";

import { Roster, Team } from "@/lib/types";
import { useState } from "react";

type RosterWithTeam = Roster & { teams: Team };

interface Filters {
  teamId?: number;
  role?: string;
  status?: string;
  role_field?: string;
}

export default function Rosters() {
  const [filters, setFilters] = useState<Filters>({});

  const { data: teams } = useTeamsWithRosters();

  const { data, isLoading } = useFilteredRoster(
    filters.teamId,
    filters.role,
    filters.status,
    filters.role_field,
  );

  if (isLoading) return <RosterSkeleton />;

  return (
    <main className="px-8 py-10">
      <RosterFilter
        teams={teams ?? []}
        filters={filters}
        onChange={(newFilters) =>
          setFilters((prev) => ({ ...prev, ...newFilters }))
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data?.length ? (
          data?.map((r: RosterWithTeam) => (
            <RosterCard key={r.id} roster={r} team={r.teams} />
          ))
        ) : (
          <div className="bg-card border-border text-muted-foreground col-span-full flex items-center justify-center rounded-md border p-6 text-sm">
            Nessun roster disponibile al momento
          </div>
        )}
      </div>
    </main>
  );
}
