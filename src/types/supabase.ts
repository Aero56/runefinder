import { Stats } from './stats';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          created_at: string;
          id: string;
          stats: Stats;
          username: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          stats?: Stats;
          username: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          stats?: Stats;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
