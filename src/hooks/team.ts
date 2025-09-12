import { getTeamsWithRosters, insertTeam } from "@/lib/actions";
import { Team } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      queryClient.invalidateQueries({ queryKey: ["teamsWithRoster"] });
    },
  });

  return { insertTeamMutation };
}
