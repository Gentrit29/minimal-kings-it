import {
  deletePresidentById,
  getPresidents,
  insertPresident,
  updatePresident,
} from "@/lib/actions";
import { President } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePresidents() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["presidents"],
    queryFn: getPresidents,
  });

  return { data, isLoading, error };
}

export function useInsertPresident() {
  const queryClient = useQueryClient();
  const { mutate: insertPresidentMutation } = useMutation({
    mutationFn: (president: President) => insertPresident(president),
    onSuccess: () => {
      toast.success("Presidente inserito con successo!");
      queryClient.invalidateQueries({ queryKey: ["presidents"] });
    },
    onError: () => {
      toast.error("Impossibile inserire il presidente. Riprova.");
    },
  });

  return { insertPresidentMutation };
}

export function useDeletePresident() {
  const queryClient = useQueryClient();
  const { mutate: deletePresidentMutation } = useMutation({
    mutationFn: (id: number) => deletePresidentById(id),
    onSuccess: () => {
      toast.success("Presidente rimosso con successo!");
      queryClient.invalidateQueries({ queryKey: ["presidents"] });
    },
    onError: () => {
      toast.error("Impossibile rimuovere il presidente. Riprova.");
    },
  });

  return { deletePresidentMutation };
}

export function useUpdatePresident() {
  const queryClient = useQueryClient();
  const { mutate: updatePresidentMutation } = useMutation({
    mutationFn: (president: President) => updatePresident(president),
    onSuccess: () => {
      toast.success("Dati aggiornati con successo!");
      queryClient.invalidateQueries({ queryKey: ["presidents"] });
    },
    onError: () => {
      toast.error("Impossibile aggiornare i dati. Riprova.");
    },
  });

  return { updatePresidentMutation };
}
