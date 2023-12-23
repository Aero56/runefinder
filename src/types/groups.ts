import { Tables } from './supabase';

export interface GroupUser {
  id: string;
  username: string;
  stats: Tables<'statistics'> | null;
}

export interface Group extends Omit<Tables<'groups'>, 'type' | 'created_by'> {
  users: GroupUser[];
  type: {
    id: string;
    name: string;
    value: string;
  };
  created_by: GroupUser;
}
