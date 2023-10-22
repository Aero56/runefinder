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

export type QueryModifiers = {
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
      activities: {
        Row: {
          id: number;
          max_size: number;
          name: string;
        };
        Insert: {
          id?: number;
          max_size: number;
          name: string;
        };
        Update: {
          id?: number;
          max_size?: number;
          name?: string;
        };
        Relationships: [];
      };
      groups: {
        Row: {
          created_at: string;
          created_by: string;
          id: string;
          name: string;
          size: number;
          status: Database['public']['Enums']['group_status_enum'];
          type: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string;
          id?: string;
          name: string;
          size: number;
          status?: Database['public']['Enums']['group_status_enum'];
          type?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: string;
          name?: string;
          size?: number;
          status?: Database['public']['Enums']['group_status_enum'];
          type?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'groups_created_by_fkey';
            columns: ['created_by'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'groups_type_fkey';
            columns: ['type'];
            referencedRelation: 'activities';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          group_id: string | null;
          id: string;
          stats: Stats | null;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          group_id?: string | null;
          id: string;
          stats?: Stats | null;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          group_id?: string | null;
          id?: string;
          stats?: Stats | null;
          username?: string | null;
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
          },
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
      group_status_enum: 'open' | 'closed';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
