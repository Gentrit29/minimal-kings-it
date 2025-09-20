import supabase from "@/providers/supabase";
import { President, Roster, SignIn, Team } from "@/lib/types";

export async function getPresidents() {
  const { data: presidents, error } = await supabase
    .from("presidents")
    .select("*, teams(*)");

  if (error) throw new Error(error.message);

  return presidents;
}

export async function insertPresident(president: President) {
  const { data, error } = await supabase.from("presidents").insert(president);

  if (error) throw new Error(error.message);

  return data;
}

export async function deletePresidentById(id: number) {
  const { data, error } = await supabase
    .from("presidents")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;
}

export async function updatePresident(president: President) {
  const { id, ...fields } = president;
  const { data, error } = await supabase
    .from("presidents")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getTeamsWithRosters() {
  const { data: teams, error } = await supabase
    .from("teams")
    .select("*, roster(*), president:president_id(*)")
    .order("role_order", { referencedTable: "roster" });

  if (error) throw new Error(error.message);

  return teams;
}

export async function insertTeam(team: Team) {
  const { data, error } = await supabase.from("teams").insert(team);

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteTeamById(id: number) {
  const { data, error } = await supabase.from("teams").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return data;
}

export async function updateTeam(team: Team) {
  const { id, ...fields } = team;
  const { data, error } = await supabase
    .from("teams")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

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
