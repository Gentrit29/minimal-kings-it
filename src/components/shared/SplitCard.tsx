import React from "react";

import { SplitWithWinner } from "@/lib/types";

import { Calendar, Medal, Trophy } from "lucide-react";

import { format } from "date-fns";

interface PresidentCardProps {
  split: SplitWithWinner;
  children?: React.ReactNode;
}

export default function SplitCard({ split, children }: PresidentCardProps) {
  return (
    <div className="bg-card border-border text-card-foreground flex flex-col gap-2 rounded-md p-4">
      <div className="flex items-center gap-2">
        <Trophy className="text-primary" />
        <h2 className="text-base sm:text-lg">{split.name}</h2>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="text-primary" />
        <span className="text-base sm:text-lg">
          {split.start_date
            ? format(new Date(split.start_date), "dd-MM-yyy")
            : "Da definire"}
        </span>
        <div className="bg-border h-4 w-0.5 rounded-md" />
        <span className="text-base sm:text-lg">
          {split.end_date
            ? format(new Date(split.end_date), "dd-MM-yyyy")
            : "Da definire"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Medal className="text-primary" />
        <span className="text-lg">
          {split.winner_team_id?.name || "Da definere"}
        </span>
      </div>
      {children && (
        <div className="mt-4 flex items-center gap-2">{children}</div>
      )}
    </div>
  );
}
