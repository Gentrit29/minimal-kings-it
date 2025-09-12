import { getAdmin, logout, signIn } from "@/lib/actions";
import { SignIn } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const queryClient = useQueryClient();
  const { mutate: signInMutation } = useMutation({
    mutationFn: (credentials: SignIn) => signIn(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });

  return { signInMutation };
}

export function useAdmin() {
  const { data: admin, isPending } = useQuery({
    queryKey: ["admin"],
    queryFn: getAdmin,
  });

  return { admin, isPending, isAuthenticated: admin?.role === "authenticated" };
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });

  return { logoutMutation };
}
