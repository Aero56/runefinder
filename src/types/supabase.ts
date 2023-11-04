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
      comments: {
        Row: {
          comment: string;
          commenter_id: string;
          created_at: string;
          id: number;
          user_id: string;
        };
        Insert: {
          comment?: string;
          commenter_id?: string;
          created_at?: string;
          id?: number;
          user_id: string;
        };
        Update: {
          comment?: string;
          commenter_id?: string;
          created_at?: string;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_commenter_id_fkey';
            columns: ['commenter_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
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
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'groups_type_fkey';
            columns: ['type'];
            isOneToOne: false;
            referencedRelation: 'activities';
            referencedColumns: ['id'];
          },
        ];
      };
      player_votes: {
        Row: {
          created_at: string;
          player_id: string;
          user_id: string;
          vote: number;
        };
        Insert: {
          created_at?: string;
          player_id: string;
          user_id?: string;
          vote?: number;
        };
        Update: {
          created_at?: string;
          player_id?: string;
          user_id?: string;
          vote?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'player_votes_player_id_fkey';
            columns: ['player_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'player_votes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          description: string | null;
          group_id: string | null;
          id: string;
          stats: Stats | null;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          group_id?: string | null;
          id: string;
          stats?: Stats | null;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          group_id?: string | null;
          id?: string;
          stats?: Stats | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
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
      get_player_votes: {
        Args: {
          var_player_id: string;
        };
        Returns: number;
      };
    };
    Enums: {
      group_status_enum: 'open' | 'closed';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
