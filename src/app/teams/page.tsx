"use client";

import Header from "@/components/Header";
import TeamTable from "@/components/teams/TeamTable";
import { useTeamsWithRosters } from "@/hooks";

export default function Teams() {
  const { data } = useTeamsWithRosters();

  return (
    <>
      <Header />
      <TeamTable teams={data ?? []} />
    </>
  );
}
