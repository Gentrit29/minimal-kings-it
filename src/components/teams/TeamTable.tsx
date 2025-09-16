import Image from "next/image";

import { isNew } from "@/lib/helpers";
import { Team } from "@/lib/types";

import { TfiCrown, TfiLink } from "react-icons/tfi";

interface TeamTableProps {
  teams: Team[];
}

export default function TeamTable({ teams }: TeamTableProps) {
  return (
    <div className="grid grid-cols-1 gap-6 px-8 py-10 sm:grid-cols-2 2xl:grid-cols-3">
      {teams.map((team) => (
        <div
          key={team.id}
          className="flex flex-col rounded-md border border-neutral-600 bg-neutral-900"
        >
          <div className="flex items-center justify-between bg-neutral-900 p-3">
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
                className="flex items-center gap-1 transition-colors duration-300 hover:text-yellow-500"
              >
                <TfiLink />
                <h3 className="text-lg font-semibold">{team.name}</h3>
              </a>
            </div>
            <span className="flex items-center gap-2 text-base">
              <TfiCrown className="text-yellow-500" />
              {team.president?.name}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-t border-neutral-600 bg-neutral-900">
                <tr>
                  <th className="border-b border-neutral-600 px-3 py-2">
                    Nome
                  </th>
                  <th className="border-b border-neutral-600 px-3 py-2">
                    Posizione
                  </th>
                  <th className="border-b border-neutral-600 px-3 py-2">
                    Stato
                  </th>
                  <th className="border-b border-neutral-600 px-3 py-2">
                    Ruolo
                  </th>
                </tr>
              </thead>
              <tbody>
                {team.roster?.map((r) => (
                  <tr key={r.id} className="border-b border-neutral-600">
                    <td className="flex items-center px-3 py-2">
                      {r.name}
                      {isNew(r.created_at) && (
                        <span className="ml-2 animate-pulse rounded bg-green-500 px-2 py-0.5 text-xs text-white">
                          New
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
