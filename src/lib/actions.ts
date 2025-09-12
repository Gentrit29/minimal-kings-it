import supabase from "@/providers/supabase";
import { Roster, SignIn, Team } from "@/lib/types";

export async function getTeamsWithRosters() {
  const { data: teams, error } = await supabase
    .from("teams")
    .select("*, roster(*)");

  if (error) throw new Error(error.message);

  return teams;
}

export async function insertTeam(team: Team) {
  const { data, error } = await supabase.from("teams").insert(team);

  if (error) throw new Error(error.message);

  return data;
}

export async function insertRoster(roster: Roster) {
  const { data, error } = await supabase.from("roster").insert(roster);

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteRosterById(id: string) {
  const { data, error } = await supabase.from("roster").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return data;
}

export async function updateRoster(roster: Roster) {
  const { id, ...fields } = roster;
  const { data, error } = await supabase
    .from("roster")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function signIn(credentials: SignIn) {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) throw new Error(error.message);

  return data;
}

export async function getAdmin() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) throw new Error(error.message);
}
