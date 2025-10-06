import Image from "next/image";

import { Button } from "@/components/ui/Button";

import { Team } from "@/lib/types";

import { useDeleteTeam } from "@/hooks";

import { ChevronDown, ChevronUp, Crown, Pencil, Trash } from "lucide-react";

interface TeamRowProps {
  team: Team;
  open: boolean;
  onToggle: () => void;
  onEditTeam: (team: Team) => void;
}

export default function TeamRow({
  team,
  open,
  onToggle,
  onEditTeam,
}: TeamRowProps) {
  const { deleteTeamMutation } = useDeleteTeam();
  return (
    <div className="border-border bg-card text-card-foreground w-full rounded-md border p-2 sm:p-4">
      <div className="flex items-center">
        <div className="flex flex-col items-start space-y-2">
          <span className="flex items-center gap-2">
            <Image
              src={`${team.logo}?v=${Date.now()}`}
              alt={team.name}
              width={35}
              height={35}
            />
            {team.name}
          </span>
          <span className="ml-2 flex items-center gap-2">
            <Crown className="text-yellow-500" />
            {team.president?.name}
          </span>
        </div>
        <div className="ml-auto flex flex-col items-center gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => onEditTeam(team)}>
            <Pencil />
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteTeamMutation(team.id!)}
          >
            <Trash />
          </Button>
          <Button variant="ghost" onClick={onToggle}>
            {open ? <ChevronDown /> : <ChevronUp />}
          </Button>
        </div>
      </div>
    </div>
  );
}
