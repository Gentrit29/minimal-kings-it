export type Role = "coach" | "staff" | "player";
export type Status = "wildcard" | "draft" | "transfer";

export interface President {
  id: number;
  name: string;
  social_links: Record<string, string>;
  photo: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  kl_link: string;
  president_id: number;
  president?: President;
  roster?: Roster[];
}

export interface Roster {
  id?: string;
  name: string;
  team_id: number;
  role: Role;
  status?: Status;
}

export interface SignIn {
  email: string;
  password: string;
}
