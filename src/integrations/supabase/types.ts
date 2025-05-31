export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      career_applications: {
        Row: {
          additional_info: string | null
          applicant_email: string
          applicant_name: string
          availability_date: string | null
          cover_letter: string | null
          created_at: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          phone_number: string | null
          portfolio_url: string | null
          position_title: string
          resume_url: string | null
          salary_expectation: string | null
          status: string | null
          updated_at: string | null
          work_authorization: string | null
          years_experience: number | null
        }
        Insert: {
          additional_info?: string | null
          applicant_email: string
          applicant_name: string
          availability_date?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone_number?: string | null
          portfolio_url?: string | null
          position_title: string
          resume_url?: string | null
          salary_expectation?: string | null
          status?: string | null
          updated_at?: string | null
          work_authorization?: string | null
          years_experience?: number | null
        }
        Update: {
          additional_info?: string | null
          applicant_email?: string
          applicant_name?: string
          availability_date?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone_number?: string | null
          portfolio_url?: string | null
          position_title?: string
          resume_url?: string | null
          salary_expectation?: string | null
          status?: string | null
          updated_at?: string | null
          work_authorization?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      game_sessions: {
        Row: {
          completed: boolean | null
          created_at: string | null
          duration_seconds: number | null
          game_id: string | null
          id: string
          score: number | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          duration_seconds?: number | null
          game_id?: string | null
          id?: string
          score?: number | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          duration_seconds?: number | null
          game_id?: string | null
          id?: string
          score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty: string
          id: string
          is_free: boolean | null
          name: string
          price_pi: number | null
          thumbnail_url: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty: string
          id?: string
          is_free?: boolean | null
          name: string
          price_pi?: number | null
          thumbnail_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty?: string
          id?: string
          is_free?: boolean | null
          name?: string
          price_pi?: number | null
          thumbnail_url?: string | null
        }
        Relationships: []
      }
      leaderboards: {
        Row: {
          achieved_at: string | null
          game_id: string | null
          high_score: number
          id: string
          rank: number | null
          user_id: string | null
        }
        Insert: {
          achieved_at?: string | null
          game_id?: string | null
          high_score: number
          id?: string
          rank?: number | null
          user_id?: string | null
        }
        Update: {
          achieved_at?: string | null
          game_id?: string | null
          high_score?: number
          id?: string
          rank?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leaderboards_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leaderboards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      links: {
        Row: {
          clicks: number | null
          created_at: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          position: number | null
          title: string
          updated_at: string | null
          url: string
          user_id: string | null
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          position?: number | null
          title: string
          updated_at?: string | null
          url: string
          user_id?: string | null
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          position?: number | null
          title?: string
          updated_at?: string | null
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "links_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pi_payments: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          id: string
          memo: string | null
          metadata: Json | null
          payment_id: string
          payment_type: string | null
          status: string | null
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          memo?: string | null
          metadata?: Json | null
          payment_id: string
          payment_type?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          memo?: string | null
          metadata?: Json | null
          payment_id?: string
          payment_type?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pi_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      purchased_games: {
        Row: {
          created_at: string | null
          game_id: string | null
          id: string
          payment_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          game_id?: string | null
          id?: string
          payment_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          game_id?: string | null
          id?: string
          payment_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchased_games_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchased_games_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "pi_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchased_games_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tips: {
        Row: {
          amount: number
          created_at: string | null
          from_user_id: string | null
          id: string
          message: string | null
          payment_id: string | null
          to_user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          from_user_id?: string | null
          id?: string
          message?: string | null
          payment_id?: string | null
          to_user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          from_user_id?: string | null
          id?: string
          message?: string | null
          payment_id?: string | null
          to_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tips_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tips_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "pi_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tips_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          custom_domain: string | null
          display_name: string | null
          games_played: number | null
          id: string
          pi_domain: string | null
          pi_wallet_address: string | null
          plan: string | null
          total_score: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          custom_domain?: string | null
          display_name?: string | null
          games_played?: number | null
          id: string
          pi_domain?: string | null
          pi_wallet_address?: string | null
          plan?: string | null
          total_score?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          custom_domain?: string | null
          display_name?: string | null
          games_played?: number | null
          id?: string
          pi_domain?: string | null
          pi_wallet_address?: string | null
          plan?: string | null
          total_score?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
