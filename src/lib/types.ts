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
}

export interface SignIn {
  email: string;
  password: string;
}
