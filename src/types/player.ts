import { Tables } from './supabase';

export interface Player extends Omit<Tables<'users'>, 'group_id'> {
  stats: Tables<'statistics'>;
  group: Tables<'groups'>;
}
