"use client";

import SplitSelect from "@/components/SplitSelect";
import TableSkeleton from "@/components/TableSkeleton";
import TeamTable from "@/components/teams/TeamTable";

import { useSplits, useTeamsWithRosters } from "@/hooks";
import { useState } from "react";

export default function Teams() {
  const [splitId, setSplitId] = useState<number | undefined>(8);

  const { data, isLoading } = useTeamsWithRosters(splitId);

  const { data: splits } = useSplits();

  if (isLoading) return <TableSkeleton />;

  return (
    <main className="flex w-full flex-col space-y-4 px-8 py-10">
      <SplitSelect
        className="ml-auto w-fit"
        splits={splits ?? []}
        value={splitId}
        onChange={setSplitId}
      />
      <TeamTable teams={data ?? []} />
    </main>
  );
}
