import { ActivityType } from './activities';
import { Tables } from './supabase';

export interface GroupUser {
  id: string;
  username: string;
  stats: Tables<'statistics'> | null;
}

export interface Group
  extends Omit<Tables<'groups'>, 'activity' | 'created_by'> {
  users: GroupUser[];
  activity: {
    id: string;
    name: string;
    value: string;
    type: ActivityType;
  };
  created_by: GroupUser;
}
