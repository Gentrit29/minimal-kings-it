export type Role = "coach" | "staff" | "player";
export type Status = "wildcard" | "draft" | "transfer";
export type RoleField = "ATT" | "CC" | "POR" | "DIF";

export interface President {
  id?: number;
  name: string;
  social_links: Record<string, string>;
  photo: string;
  teams?: Team;
}

export interface Team {
  id?: number;
  name: string;
  logo: string;
  kl_link: string;
  president_id: number;
  president?: President;
  roster?: Roster[];
}

export interface Roster {
  id?: string;
  created_at?: string;
  name: string;
  team_id: number;
  role: Role;
  status?: Status;
  role_field?: RoleField;
  split_id?: number;
}

export interface Split {
  id?: number;
  name: string;
  start_date?: string;
  end_date?: string;
  winner_team_id?: number;
}

export interface SplitWithWinner extends Omit<Split, "winner_team_id"> {
  winner_team_id?: { id: number; name: string };
}

export interface SignIn {
  email: string;
  password: string;
}
