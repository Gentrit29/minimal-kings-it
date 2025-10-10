import {
  deleteRosterById,
  getFilteredRoster,
  insertRoster,
  updateRoster,
} from "@/lib/actions";
import { Roster } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useInsertRoster() {
  const queryClient = useQueryClient();
  const { mutate: insertRosterMutation } = useMutation({
    mutationFn: (roster: Roster) => insertRoster(roster),
    onSuccess: () => {
      toast.success("Roster inserito con successo!");
      queryClient.invalidateQueries({ queryKey: ["teamsWithRoster"] });
    },
    onError: () => {
      toast.error("Impossibile inserire il roster. Riprova.");
    },
  });

  return { insertRosterMutation };
}

export function useDeleteRoster() {
  const queryClient = useQueryClient();
  const { mutate: deleteRosterMutation } = useMutation({
    mutationFn: (id: string) => deleteRosterById(id),
    onSuccess: () => {
      toast.success("Roster eliminato con successo!");
      queryClient.invalidateQueries({ queryKey: ["teamsWithRoster"] });
    },
    onError: () => {
      toast.error("Impossibile eliminare il roster. Riprova.");
    },
  });

  return { deleteRosterMutation };
}

export function useUpdateRoster() {
  const queryClient = useQueryClient();
  const { mutate: updateRosterMutation } = useMutation({
    mutationFn: (roster: Roster) => updateRoster(roster),
    onSuccess: () => {
      toast.success("Roster aggiornato con successo!");
      queryClient.invalidateQueries({ queryKey: ["teamsWithRoster"] });
    },
    onError: () => {
      toast.error("Impossibile aggiornare il roster. Riprova.");
    },
  });

  return { updateRosterMutation };
}

export function useFilteredRoster(
  teamId?: number,
  role?: string,
  status?: string,
  role_field?: string,
  split_id?: number,
) {
  const { data, isLoading } = useQuery({
    queryKey: ["filteredRoster", teamId, role, status, role_field, split_id],
    queryFn: () =>
      getFilteredRoster(teamId, role, status, role_field, split_id),
  });

  return { data, isLoading };
}
