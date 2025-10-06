import React from "react";

import Image from "next/image";

import { Roster, Team } from "@/lib/types";

interface CardProps {
  roster: Roster;
  team: Team;
}

export default function RosterCard({ team, roster }: CardProps) {
  return (
    <div className="group border-border hover:border-ring bg-card text-card-foreground flex max-h-[450px] w-full flex-col items-center justify-between space-y-3 rounded-md border p-4 transition-colors duration-300">
      <Image
        src="/kl-placeholder.png"
        alt="foto"
        width={250}
        height={250}
        className="border-border max-h-[200px] w-full rounded-md border object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <h3 className="text-lg">{roster.name}</h3>
      <div className="flex items-center gap-2">
        <p className="text-muted-foreground text-sm">{roster.role}</p>
        <div className="bg-border h-4 w-0.5 rounded-md" />
        <p className="text-muted-foreground text-sm">
          {roster.status || "----"}
        </p>
        <div className="bg-border h-4 w-0.5 rounded-md" />
        <p className="text-muted-foreground text-sm">
          {roster.role_field || "----"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src={`${team.logo}?v=${Date.now()}`}
          alt={team.name}
          width={32}
          height={32}
        />
        <span className="text-sm">{team.name}</span>
      </div>
    </div>
  );
}
