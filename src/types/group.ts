import { Table } from "./supabase";

export interface Group extends Table<'groups'> {
    users: {
      id: string;
      username: string;
    }[];
  }