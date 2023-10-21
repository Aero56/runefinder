import { Table } from './supabase';

export interface Group extends Omit<Table<'groups'>, 'type'> {
  users: {
    id: string;
    username: string | null;
  }[];
  type: {
    id: string;
    name: string;
  };
}
