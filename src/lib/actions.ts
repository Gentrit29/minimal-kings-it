import supabase from "@/providers/supabase";
import {
  President,
  Roster,
  SignIn,
  Split,
  SplitWithWinner,
  Team,
} from "@/lib/types";

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
      upsert: true,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage
    .from("presidents-bucket")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function getSplits(): Promise<SplitWithWinner[]> {
  const { data: teams, error } = await supabase
    .from("splits")
    .select("*, winner_team_id(id, name)");

  if (error) throw new Error(error.message);

  return teams;
}

export async function insertSplit(split: Split): Promise<Split> {
  const { data, error } = await supabase
    .from("splits")
    .insert([split])
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (!data) throw new Error("No data returned after insert.");

  return data;
}

export async function deleteSplitById(id: number): Promise<void> {
  const { error } = await supabase.from("splits").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function updateSplit(split: Split): Promise<Split> {
  const { id, ...fields } = split;
  const { data, error } = await supabase
    .from("splits")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getTeamsWithRosters(split_id?: number): Promise<Team[]> {
  let query = supabase
    .from("teams")
    .select("*, roster(*), president:president_id(*)")
    .order("role_order", { referencedTable: "roster" });

  if (split_id) {
    query = query.eq("roster.split_id", split_id);
  }

  const { data: teams, error } = await query;

  if (error) throw new Error(error.message);

  return teams;
}

export async function insertTeam(team: Team): Promise<Team> {
  const { data, error } = await supabase
    .from("teams")
    .insert([team])
    .select()
    .single();

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

export async function uploadTeamLogo(
  file: File,
  teamId: number,
): Promise<string> {
  const filePath = `teams/${teamId}`;

  if (teamId) {
    await supabase.storage.from("teams-bucket").remove([filePath]);
  }

  const { error } = await supabase.storage
    .from("teams-bucket")
    .upload(filePath, file, {
      cacheControl: "no-cache",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("teams-bucket").getPublicUrl(filePath);

  return data.publicUrl;
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

export async function getFilteredRoster(
  teamId?: number,
  role?: string,
  status?: string,
  role_field?: string,
  split_id?: number,
): Promise<(Roster & { teams: Team })[]> {
  let query = supabase.from("roster").select("*, teams(*)");

  if (teamId) query = query.eq("team_id", teamId);
  if (role) query = query.eq("role", role);
  if (role === "player" && status) query = query.eq("status", status);
  if (role === "player" && role_field)
    query = query.eq("role_field", role_field);
  if (split_id) query = query.eq("split_id", split_id);

  const { data, error } = await query.order("role_order", { ascending: true });

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
