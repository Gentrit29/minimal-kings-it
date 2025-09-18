import { Roster } from "@/lib/types";

import { useDeleteRoster } from "@/hooks";

import { Button } from "@/components/ui/Button";

import { Edit, Trash, User } from "lucide-react";

interface RosterRowProps {
  roster: Roster;
  onEditRoster: (roster: Roster) => void;
}

export default function RosterRow({ roster, onEditRoster }: RosterRowProps) {
  const { deleteRosterMutation } = useDeleteRoster();
  return (
    <div className="border-border text-card-foreground w-full rounded-md border p-3">
      <div className="flex w-full flex-col items-center justify-between sm:flex-row">
        <span className="flex items-center gap-2">
          <User />
          {roster.name}
        </span>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:mt-0">
          <span className="border-border rounded-lg border px-3 py-1 text-sm font-semibold">
            {roster.role}
          </span>
          <span className="border-border rounded-md border px-3 py-1">
            {roster.status || "----"}
          </span>
          <span className="border-border rounded-md border px-3 py-1">
            {roster.role_field || "----"}
          </span>
          <div className="bg-border w-0.5 rounded-md" />
          <Button variant="outline" onClick={() => onEditRoster(roster)}>
            <Edit />
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteRosterMutation(roster.id!)}
          >
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
}
