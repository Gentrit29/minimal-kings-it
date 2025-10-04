import {
  deleteTeamById,
  getTeamsWithRosters,
  insertTeam,
  updateTeam,
  uploadTeamLogo,
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
  const { mutateAsync: insertTeamMutation } = useMutation({
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
  const { mutateAsync: updateTeamMutation } = useMutation({
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

export function useUploadTeamLogo() {
  const queryClient = useQueryClient();
  const { mutateAsync: uploadTeamLogoMutation } = useMutation({
    mutationFn: ({ file, teamId }: { file: File; teamId: number }) =>
      uploadTeamLogo(file, teamId),
    onSuccess: () => {
      toast.success("Logo caricato con successo!");
      queryClient.invalidateQueries({ queryKey: ["teamsWithRoster"] });
    },
    onError: () => {
      toast.error("Impossibile caricare il logo. Riprova.");
    },
  });

  return { uploadTeamLogoMutation };
}
