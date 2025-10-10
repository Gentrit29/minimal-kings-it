import {
  deleteSplitById,
  getSplits,
  insertSplit,
  updateSplit,
} from "@/lib/actions";
import { Split } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSplits() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["splits"],
    queryFn: getSplits,
  });

  return { data, isLoading, error };
}

export function useInsertSplit() {
  const queryClient = useQueryClient();
  const { mutate: insertSplitMutation } = useMutation({
    mutationFn: (split: Split) => insertSplit(split),
    onSuccess: () => {
      toast.success("Split inserito con successo!");
      queryClient.invalidateQueries({ queryKey: ["splits"] });
    },
    onError: () => {
      toast.error("Impossibile inserire lo split. Riprova.");
    },
  });

  return { insertSplitMutation };
}

export function useDeleteSplit() {
  const queryClient = useQueryClient();
  const { mutate: deleteSplitMutation } = useMutation({
    mutationFn: (id: number) => deleteSplitById(id),
    onSuccess: () => {
      toast.success("Split rimosso con successo!");
      queryClient.invalidateQueries({ queryKey: ["splits"] });
    },
    onError: () => {
      toast.error("Impossibile rimuovere lo split. Riprova.");
    },
  });

  return { deleteSplitMutation };
}

export function useUpdateSplit() {
  const queryClient = useQueryClient();
  const { mutate: updateSplitMutation } = useMutation({
    mutationFn: (split: Split) => updateSplit(split),
    onSuccess: () => {
      toast.success("Dati aggiornati con successo!");
      queryClient.invalidateQueries({ queryKey: ["splits"] });
    },
    onError: () => {
      toast.error("Impossibile aggiornare i dati. Riprova.");
    },
  });

  return { updateSplitMutation };
}
