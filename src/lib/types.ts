export type Role = "coach" | "staff" | "player";
export type Status = "wildcard" | "draft" | "transfer";

export interface Team {
  id: number;
  name: string;
  owner: string;
  logo: string;
  external_link: string;
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
