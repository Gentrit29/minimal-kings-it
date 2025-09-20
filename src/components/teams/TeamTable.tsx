import Image from "next/image";

import { isNew } from "@/lib/utils";
import { Team } from "@/lib/types";

import { Crown, ExternalLink } from "lucide-react";

interface TeamTableProps {
  teams: Team[];
}

export default function TeamTable({ teams }: TeamTableProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
      {teams.map((team) => (
        <div
          key={team.id}
          className="border-border text-card-foreground bg-card flex flex-col rounded-md border"
        >
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <Image
                src={team.logo}
                alt={team.name}
                width={50}
                height={50}
                className="hidden rounded-md md:flex"
              />
              <a
                href={team.kl_link}
                rel="noreferrer noopener"
                target="_blank"
                className="hover:text-primary flex items-center gap-1 transition-colors duration-300"
              >
                <ExternalLink />
                <h3 className="text-lg font-semibold">{team.name}</h3>
              </a>
            </div>
            <span className="flex items-center gap-2 text-base">
              <Crown className="text-yellow-500" />
              {team.president?.name}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-border border-t">
                <tr>
                  <th className="border-border border-b px-3 py-2">Nome</th>
                  <th className="border-border border-b px-3 py-2">
                    Posizione
                  </th>
                  <th className="border-border border-b px-3 py-2">Stato</th>
                  <th className="border-border border-b px-3 py-2">Ruolo</th>
                </tr>
              </thead>
              <tbody>
                {team.roster?.map((r) => (
                  <tr key={r.id} className="border-border border-b">
                    <td className="flex items-center px-3 py-2">
                      {r.name}
                      {isNew(r.created_at!) && (
                        <span className="ml-2 animate-pulse rounded bg-green-500 px-2 py-0.5 text-xs">
                          Nuovo
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2">{r.role}</td>
                    <td className="px-3 py-2">{r.status || "---"}</td>
                    <td className="px-3 py-2">{r.role_field || "---"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
