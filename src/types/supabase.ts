import { Stats } from './stats';

export enum AuthProviders {
  Google = 'google',
  Discord = 'discord',
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Table<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type QueryParams = {
  order?: {
    column: string;
    options: {
      ascending?: boolean;
      nullsFirst?: boolean;
      foreignTable?: undefined;
    };
  };
};

export interface Database {
  public: {
    Tables: {
      groups: {
        Row: {
          created_at: string;
          created_by: string;
          id: string;
          name: string;
          size: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          id?: string;
          name: string;
          size: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: string;
          name?: string;
          size?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'groups_created_by_fkey';
            columns: ['created_by'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          group_id: string | null;
          id: string;
          stats: Stats;
          username: string;
        };
        Insert: {
          created_at?: string;
          group_id?: string | null;
          id: string;
          stats?: Stats;
          username: string;
        };
        Update: {
          created_at?: string;
          group_id?: string | null;
          id?: string;
          stats?: Stats;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_group_id_fkey';
            columns: ['group_id'];
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
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
