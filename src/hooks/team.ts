import {
  deleteTeamById,
  getTeamsWithRosters,
  insertTeam,
  updateTeam,
} from "@/lib/actions";
import { Team } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useTeamsWithRosters() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["teamsWithRoster"],
    queryFn: getTeamsWithRosters,
  });

  return { data, isLoading, error };
}

export function useInsertTeam() {
  const queryClient = useQueryClient();
  const { mutate: insertTeamMutation } = useMutation({
    mutationFn: (team: Team) => insertTeam(team),
    onSuccess: () => {
      toast.success("Team inserito con successo!");
      queryClient.invalidateQueries({ queryKey: ["teamsWithRoster"] });
    },
    onError: () => {
      toast.error("Impossibile inserire il team. Riprova.");
    },
  });

  return { insertTeamMutation };
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  const { mutate: deleteTeamMutation } = useMutation({
    mutationFn: (id: number) => deleteTeamById(id),
    onSuccess: () => {
      toast.success("Team rimosso con successo!");
      queryClient.invalidateQueries({ queryKey: ["teamsWithRoster"] });
    },
    onError: () => {
      toast.error("Impossibile rimuovere il team. Riprova.");
    },
  });

  return { deleteTeamMutation };
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();
  const { mutate: updateTeamMutation } = useMutation({
    mutationFn: (team: Team) => updateTeam(team),
    onSuccess: () => {
      toast.success("Dati aggiornati con successo!");
      queryClient.invalidateQueries({ queryKey: ["teamsWithRoster"] });
    },
    onError: () => {
      toast.error("Impossibile aggiornare i dati. Riprova.");
    },
  });

  return { updateTeamMutation };
}
