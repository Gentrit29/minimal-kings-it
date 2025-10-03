import supabase from "@/providers/supabase";
import { President, Roster, SignIn, Team } from "@/lib/types";

export async function getPresidents(): Promise<President[]> {
  const { data: presidents, error } = await supabase
    .from("presidents")
    .select("*, teams(*)");

  if (error) throw new Error(error.message);

  return presidents;
}

export async function insertPresident(
  president: President,
): Promise<President> {
  const { data, error } = await supabase
    .from("presidents")
    .insert([president])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deletePresidentById(id: number): Promise<void> {
  const { error } = await supabase.from("presidents").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function updatePresident(
  president: President,
): Promise<President> {
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

export async function uploadPresidentPhoto(
  file: File,
  presidentId: number,
): Promise<string> {
  const filePath = `presidents/${presidentId}`;

  if (presidentId) {
    await supabase.storage.from("presidents-bucket").remove([filePath]);
  }

  const { error } = await supabase.storage
    .from("presidents-bucket")
    .upload(filePath, file, {
      cacheControl: "no-cache",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage
    .from("presidents-bucket")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function getTeamsWithRosters(): Promise<Team[]> {
  const { data: teams, error } = await supabase
    .from("teams")
    .select("*, roster(*), president:president_id(*)")
    .order("role_order", { referencedTable: "roster" });

  if (error) throw new Error(error.message);

  return teams;
}

export async function insertTeam(team: Team): Promise<Team> {
  const { data, error } = await supabase.from("teams").insert(team);

  if (error) throw new Error(error.message);

  if (!data) throw new Error("No data returned after insert.");

  return data;
}

export async function deleteTeamById(id: number): Promise<void> {
  const { error } = await supabase.from("teams").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function updateTeam(team: Team): Promise<Team> {
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

export async function insertRoster(roster: Roster): Promise<Roster> {
  const { data, error } = await supabase
    .from("roster")
    .insert([roster])
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (!data) throw new Error("No data returned after insert.");

  return data;
}

export async function deleteRosterById(id: string): Promise<void> {
  const { error } = await supabase.from("roster").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function updateRoster(roster: Roster): Promise<Roster> {
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
