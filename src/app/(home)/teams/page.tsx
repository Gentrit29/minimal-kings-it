"use client";

import TableSkeleton from "@/components/TableSkeleton";
import TeamTable from "@/components/teams/TeamTable";
import { useTeamsWithRosters } from "@/hooks";

export default function Teams() {
  const { data, isLoading } = useTeamsWithRosters();

  if (isLoading) return <TableSkeleton />;

  return (
    <main>
      <TeamTable teams={data ?? []} />
    </main>
  );
}
