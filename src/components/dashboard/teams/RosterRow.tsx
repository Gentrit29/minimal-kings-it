import { JSX } from "react";

import { Roster, Status } from "@/lib/types";

import { LuCircleUser } from "react-icons/lu";
import { AiOutlineThunderbolt } from "react-icons/ai";

import { useDeleteRoster } from "@/hooks";

import Button from "../../ui/Button";

interface RosterRowProps {
  roster: Roster;
  onEditRoster: (roster: Roster) => void;
}

type StatusStyle = {
  text: string;
  className: string;
  icon?: JSX.Element;
};

const statusStyle: Record<Status, StatusStyle> = {
  wildcard: {
    text: "Wildcard",
    className: "border border-yellow-500 px-3 py-1 rounded-lg",
    icon: <AiOutlineThunderbolt className="hidden h-4 w-4 sm:block" />,
  },
  draft: {
    text: "Draft",
    className: "border border-teal-500 px-3 py-1 rounded-lg",
  },
  transfer: {
    text: "Transfer",
    className: "border border-indigo-500 px-3 py-1 rounded-lg",
  },
};

export default function RosterRow({ roster, onEditRoster }: RosterRowProps) {
  const { deleteRosterMutation } = useDeleteRoster();
  return (
    <div className="w-full rounded-md border border-yellow-500 bg-neutral-900 p-3">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <span className="flex items-center gap-2">
          <LuCircleUser className="h-6 w-6" />
          {roster.name}
        </span>
        <div className="mt-4 grid grid-cols-2 gap-2 md:mt-0">
          <span className="rounded-lg border border-neutral-400 px-3 py-1 text-sm font-semibold">
            {roster.role}
          </span>
          {roster.role === "player" ? (
            <span
              className={`${statusStyle[roster.status as Status].className} flex items-center gap-2 text-sm font-semibold`}
            >
              {statusStyle[roster.status as Status].icon}
              {statusStyle[roster.status as Status].text}
            </span>
          ) : (
            <span className="rounded-lg border border-neutral-400 px-3 py-1 text-sm font-semibold">
              ----
            </span>
          )}
          <Button
            variant="primary"
            size="small"
            onClick={() => onEditRoster(roster)}
          >
            Modifica
          </Button>
          <Button
            variant="destructive"
            size="small"
            onClick={() => deleteRosterMutation(roster.id!)}
          >
            Elimina
          </Button>
        </div>
      </div>
    </div>
  );
}
