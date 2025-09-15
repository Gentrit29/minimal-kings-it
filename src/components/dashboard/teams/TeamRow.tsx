import { Team } from "@/lib/types";
import Image from "next/image";

import { TfiCrown } from "react-icons/tfi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import Button from "@/components/ui/Button";
import { useDeleteTeam } from "@/hooks";

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
    <div className="w-full rounded-md border border-neutral-600 bg-neutral-900 p-4">
      <div className="flex items-center">
        <div className="flex flex-col items-start space-y-2">
          <span className="flex items-center gap-2">
            <Image src={team.logo} alt={team.name} width={35} height={35} />
            {team.name}
          </span>
          <span className="ml-2 flex items-center gap-2">
            <TfiCrown className="h-4 w-4 text-yellow-500" />
            {team.president?.name}
          </span>
        </div>
        <div className="items-ceneter ml-auto flex gap-2">
          <Button
            variant="primary"
            size="small"
            onClick={() => onEditTeam(team)}
          >
            Modifica
          </Button>
          <Button
            variant="destructive"
            size="small"
            onClick={() => deleteTeamMutation(team.id)}
          >
            Elimina
          </Button>
          <button onClick={onToggle}>
            {open ? (
              <MdKeyboardArrowDown className="h-6 w-6" />
            ) : (
              <MdKeyboardArrowUp className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
