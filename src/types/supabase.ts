import { Bosses } from './bosses';
import { Skills } from './skills';

export enum AuthProviders {
  Google = 'google',
  Discord = 'discord',
}

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
      activities: {
        Row: {
          id: number;
          max_size: number;
          name: string;
          type: Database['public']['Enums']['activity_type_enum'] | null;
          value: string;
        };
        Insert: {
          id?: number;
          max_size: number;
          name: string;
          type?: Database['public']['Enums']['activity_type_enum'] | null;
          value: string;
        };
        Update: {
          id?: number;
          max_size?: number;
          name?: string;
          type?: Database['public']['Enums']['activity_type_enum'] | null;
          value?: string;
        };
        Relationships: [];
      };
      badges: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
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
            referencedRelation: 'top_players';
            referencedColumns: ['id'];
          },
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
            referencedRelation: 'top_players';
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
          gamemode: Database['public']['Enums']['group_mode_enum'] | null;
          id: string;
          kills: number | null;
          level: Database['public']['Enums']['group_level_enum'] | null;
          name: string;
          size: number;
          split: boolean;
          status: Database['public']['Enums']['group_status_enum'];
          type: number;
          updated_at: string;
          world: number;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          gamemode?: Database['public']['Enums']['group_mode_enum'] | null;
          id?: string;
          kills?: number | null;
          level?: Database['public']['Enums']['group_level_enum'] | null;
          name: string;
          size: number;
          split?: boolean;
          status?: Database['public']['Enums']['group_status_enum'];
          type: number;
          updated_at?: string;
          world?: number;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          gamemode?: Database['public']['Enums']['group_mode_enum'] | null;
          id?: string;
          kills?: number | null;
          level?: Database['public']['Enums']['group_level_enum'] | null;
          name?: string;
          size?: number;
          split?: boolean;
          status?: Database['public']['Enums']['group_status_enum'];
          type?: number;
          updated_at?: string;
          world?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'groups_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'top_players';
            referencedColumns: ['id'];
          },
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
            referencedRelation: 'top_players';
            referencedColumns: ['id'];
          },
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
      user_badges: {
        Row: {
          badge_id: number;
          id: number;
          user_id: string;
        };
        Insert: {
          badge_id: number;
          id?: number;
          user_id: string;
        };
        Update: {
          badge_id?: number;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_badges_badge_id_fkey';
            columns: ['badge_id'];
            isOneToOne: false;
            referencedRelation: 'badges';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_badges_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'top_players';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_badges_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      user_details: {
        Row: {
          boss_score: number;
          bosses: Bosses;
          combat: number;
          created_at: string;
          gamemode: Database['public']['Enums']['gamemode_enum'] | null;
          id: string;
          raid_score: number;
          rank: Database['public']['Enums']['user_rank_enum'];
          skills: Skills;
        };
        Insert: {
          boss_score?: number;
          bosses: Bosses;
          combat: number;
          created_at?: string;
          gamemode?: Database['public']['Enums']['gamemode_enum'] | null;
          id: string;
          raid_score?: number;
          rank?: Database['public']['Enums']['user_rank_enum'];
          skills: Skills;
        };
        Update: {
          boss_score?: number;
          bosses?: Bosses;
          combat?: number;
          created_at?: string;
          gamemode?: Database['public']['Enums']['gamemode_enum'] | null;
          id?: string;
          raid_score?: number;
          rank?: Database['public']['Enums']['user_rank_enum'];
          skills?: Skills;
        };
        Relationships: [
          {
            foreignKeyName: 'user_details_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'top_players';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_details_id_fkey';
            columns: ['id'];
            isOneToOne: true;
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
          username: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          group_id?: string | null;
          id: string;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          group_id?: string | null;
          id?: string;
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
      top_players: {
        Row: {
          id: string | null;
          total_score: number | null;
          username: string | null;
          gamemode: Database['public']['Enums']['gamemode_enum'] | null;
        };
        Relationships: [
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
    Functions: {
      get_player_votes: {
        Args: {
          var_player_id: string;
        };
        Returns: number;
      };
      has_player_data: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      activity_type_enum: 'raid' | 'boss' | 'minigame';
      gamemode_enum: 'ironman' | 'hardcore' | 'ultimate';
      group_level_enum: 'beginner' | 'average' | 'experienced';
      group_mode_enum: 'ironman' | 'hardcore' | 'ultimate';
      group_status_enum: 'open' | 'closed';
      user_rank_enum: 'user' | 'supporter' | 'admin';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
