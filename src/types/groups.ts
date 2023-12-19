import { Stats } from './stats';
import { Table } from './supabase';

export interface GroupUser {
  id: string;
  username: string;
  stats: Stats;
}

export interface Group extends Omit<Table<'groups'>, 'type' | 'created_by'> {
  users: GroupUser[];
  type: {
    id: string;
    name: string;
    value: string;
  };
  created_by: GroupUser;
}
