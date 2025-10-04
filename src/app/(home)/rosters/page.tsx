"use client";

import RosterSkeleton from "@/components/RosterSkeleton";
import RosterCard from "@/components/shared/RosterCard";
import { useTeamsWithRosters } from "@/hooks";
import { Roster, Team } from "@/lib/types";

export default function Rosters() {
  const { isLoading, data } = useTeamsWithRosters();

  if (isLoading) return <RosterSkeleton />;

  return (
    <main className="px-8 py-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.flatMap((team: Team) =>
          team.roster?.map((r: Roster) => (
            <RosterCard key={r.id} roster={r} team={team} />
          )),
        )}
      </div>
    </main>
  );
}
