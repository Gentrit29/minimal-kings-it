"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SplitWithWinner, Team } from "@/lib/types";
import { Button } from "./ui/Button";

type RosterFilterProps = {
  teams: Team[];
  splits: SplitWithWinner[];
  filters: {
    teamId?: number;
    role?: string;
    status?: string;
    role_field?: string;
    split_id?: number;
  };
  onChange: (filters: {
    teamId?: number;
    role?: string;
    status?: string;
    role_field?: string;
    split_id?: number;
  }) => void;
};

export default function RosterFilter({
  teams,
  splits,
  onChange,
  filters,
}: RosterFilterProps) {
  const { teamId, role, status, role_field, split_id } = filters;

  return (
    <div className="bg-card border-border mb-5 flex flex-wrap gap-4 rounded-md border p-2">
      <Select
        value={split_id?.toString()}
        onValueChange={(val) => onChange({ split_id: Number(val) })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleziona Split" />
        </SelectTrigger>
        <SelectContent>
          {splits.map((split) => (
            <SelectItem key={split.id} value={split.id!.toString()}>
              {split.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={teamId?.toString()}
        onValueChange={(val) => onChange({ teamId: Number(val) })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleziona Team" />
        </SelectTrigger>
        <SelectContent>
          {teams.map((team) => (
            <SelectItem key={team.id} value={team.id!.toString()}>
              {team.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={role} onValueChange={(val) => onChange({ role: val })}>
        <SelectTrigger>
          <SelectValue placeholder="Selezione Posizione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="player">Player</SelectItem>
          <SelectItem value="coach">Coach</SelectItem>
          <SelectItem value="staff">Staff</SelectItem>
        </SelectContent>
      </Select>
      {role === "player" && (
        <>
          <Select
            value={status}
            onValueChange={(val) => onChange({ status: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona Stato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wildcard">Wildcard</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={role_field}
            onValueChange={(val) => onChange({ role_field: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona Ruolo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ATT">ATT</SelectItem>
              <SelectItem value="CC">CC</SelectItem>
              <SelectItem value="DIF">DIF</SelectItem>
              <SelectItem value="POR">POR</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}
      {(teamId || role || status || role_field) && (
        <Button
          variant="destructive"
          onClick={() =>
            onChange({
              teamId: undefined,
              role: undefined,
              status: undefined,
              role_field: undefined,
            })
          }
        >
          Pulisci Filtri
        </Button>
      )}
    </div>
  );
}
