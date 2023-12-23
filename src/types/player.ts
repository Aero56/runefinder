import { Tables } from './supabase';

export interface Player extends Tables<'users'> {
  stats: Tables<'statistics'>;
}
