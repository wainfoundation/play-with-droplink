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
      ads_rewards: {
        Row: {
          ad_type: string | null
          id: string
          reward_coins: number | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          ad_type?: string | null
          id?: string
          reward_coins?: number | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          ad_type?: string | null
          id?: string
          reward_coins?: number | null
          timestamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ads_rewards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
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
      characters: {
        Row: {
          base_price_coins: number
          color: string
          created_at: string | null
          description: string | null
          gender: string
          id: string
          is_starter: boolean | null
          name: string
          skin_image_url: string | null
        }
        Insert: {
          base_price_coins?: number
          color?: string
          created_at?: string | null
          description?: string | null
          gender?: string
          id?: string
          is_starter?: boolean | null
          name: string
          skin_image_url?: string | null
        }
        Update: {
          base_price_coins?: number
          color?: string
          created_at?: string | null
          description?: string | null
          gender?: string
          id?: string
          is_starter?: boolean | null
          name?: string
          skin_image_url?: string | null
        }
        Relationships: []
      }
      coin_packs: {
        Row: {
          bonus_percentage: number | null
          coins_given: number
          created_at: string | null
          description: string | null
          id: string
          is_best_value: boolean | null
          is_popular: boolean | null
          pi_cost: number
          savings_percentage: number | null
        }
        Insert: {
          bonus_percentage?: number | null
          coins_given: number
          created_at?: string | null
          description?: string | null
          id: string
          is_best_value?: boolean | null
          is_popular?: boolean | null
          pi_cost: number
          savings_percentage?: number | null
        }
        Update: {
          bonus_percentage?: number | null
          coins_given?: number
          created_at?: string | null
          description?: string | null
          id?: string
          is_best_value?: boolean | null
          is_popular?: boolean | null
          pi_cost?: number
          savings_percentage?: number | null
        }
        Relationships: []
      }
      daily_rewards: {
        Row: {
          claim_date: string | null
          created_at: string | null
          id: string
          reward_coins: number | null
          reward_xp: number | null
          streak_count: number | null
          user_id: string
        }
        Insert: {
          claim_date?: string | null
          created_at?: string | null
          id?: string
          reward_coins?: number | null
          reward_xp?: number | null
          streak_count?: number | null
          user_id: string
        }
        Update: {
          claim_date?: string | null
          created_at?: string | null
          id?: string
          reward_coins?: number | null
          reward_xp?: number | null
          streak_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      digital_products: {
        Row: {
          category: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          download_count: number | null
          download_expires_hours: number | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          max_downloads: number | null
          price: number
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          download_count?: number | null
          download_expires_hours?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          max_downloads?: number | null
          price?: number
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          download_count?: number | null
          download_expires_hours?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          max_downloads?: number | null
          price?: number
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "digital_products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      droplinks: {
        Row: {
          created_at: string
          game_id: string | null
          id: string
          level: number | null
          link: string
          score: number | null
          type: string
          unique_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          game_id?: string | null
          id?: string
          level?: number | null
          link: string
          score?: number | null
          type: string
          unique_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          game_id?: string | null
          id?: string
          level?: number | null
          link?: string
          score?: number | null
          type?: string
          unique_id?: string
          user_id?: string
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      forum_replies: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_solution: boolean | null
          topic_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_solution?: boolean | null
          topic_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_solution?: boolean | null
          topic_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_topics: {
        Row: {
          category_id: string | null
          content: string
          created_at: string | null
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          last_reply_at: string | null
          reply_count: number | null
          title: string
          updated_at: string | null
          user_id: string | null
          view_count: number | null
        }
        Insert: {
          category_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_reply_at?: string | null
          reply_count?: number | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          view_count?: number | null
        }
        Update: {
          category_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_reply_at?: string | null
          reply_count?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_topics_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_topics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
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
      missions: {
        Row: {
          created_at: string
          description: string
          difficulty: string
          id: string
          is_active: boolean
          mission_type: string
          reward_coins: number
          reward_xp: number
          target_count: number
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          difficulty?: string
          id?: string
          is_active?: boolean
          mission_type: string
          reward_coins?: number
          reward_xp?: number
          target_count?: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: string
          id?: string
          is_active?: boolean
          mission_type?: string
          reward_coins?: number
          reward_xp?: number
          target_count?: number
          title?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          access_token: string | null
          amount: number
          buyer_email: string | null
          buyer_id: string | null
          created_at: string | null
          currency: string | null
          download_count: number | null
          download_expires_at: string | null
          download_link: string | null
          id: string
          max_downloads: number | null
          pi_payment_id: string | null
          pi_transaction_id: string | null
          product_id: string | null
          seller_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          access_token?: string | null
          amount: number
          buyer_email?: string | null
          buyer_id?: string | null
          created_at?: string | null
          currency?: string | null
          download_count?: number | null
          download_expires_at?: string | null
          download_link?: string | null
          id?: string
          max_downloads?: number | null
          pi_payment_id?: string | null
          pi_transaction_id?: string | null
          product_id?: string | null
          seller_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string | null
          amount?: number
          buyer_email?: string | null
          buyer_id?: string | null
          created_at?: string | null
          currency?: string | null
          download_count?: number | null
          download_expires_at?: string | null
          download_link?: string | null
          id?: string
          max_downloads?: number | null
          pi_payment_id?: string | null
          pi_transaction_id?: string | null
          product_id?: string | null
          seller_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_actions: {
        Row: {
          action_type: string
          created_at: string
          experience_gained: number | null
          id: string
          pi_coins_spent: number | null
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          experience_gained?: number | null
          id?: string
          pi_coins_spent?: number | null
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          experience_gained?: number | null
          id?: string
          pi_coins_spent?: number | null
          user_id?: string
        }
        Relationships: []
      }
      pet_stats: {
        Row: {
          character_id: string
          cleanliness: number | null
          created_at: string | null
          energy: number | null
          happiness: number | null
          health: number | null
          hunger: number | null
          id: string
          last_decay: string | null
          mood: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          character_id?: string
          cleanliness?: number | null
          created_at?: string | null
          energy?: number | null
          happiness?: number | null
          health?: number | null
          hunger?: number | null
          id?: string
          last_decay?: string | null
          mood?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          character_id?: string
          cleanliness?: number | null
          created_at?: string | null
          energy?: number | null
          happiness?: number | null
          health?: number | null
          hunger?: number | null
          id?: string
          last_decay?: string | null
          mood?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
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
      room_themes: {
        Row: {
          id: string
          is_equipped: boolean | null
          purchased_at: string | null
          room_type: string
          theme_id: string
          user_id: string
        }
        Insert: {
          id?: string
          is_equipped?: boolean | null
          purchased_at?: string | null
          room_type: string
          theme_id: string
          user_id: string
        }
        Update: {
          id?: string
          is_equipped?: boolean | null
          purchased_at?: string | null
          room_type?: string
          theme_id?: string
          user_id?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          background_color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          room_type: string
        }
        Insert: {
          background_color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          room_type: string
        }
        Update: {
          background_color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          room_type?: string
        }
        Relationships: []
      }
      shop_items: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          effect: Json | null
          id: string
          image_url: string | null
          name: string
          price_coins: number
          rarity: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          effect?: Json | null
          id: string
          image_url?: string | null
          name: string
          price_coins: number
          rarity?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          effect?: Json | null
          id?: string
          image_url?: string | null
          name?: string
          price_coins?: number
          rarity?: string | null
        }
        Relationships: []
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
      user_characters: {
        Row: {
          accessories: Json | null
          background: string
          color: string
          created_at: string
          id: string
          name: string
          stats: Json | null
          tutorial_completed: boolean | null
          unlocked_rooms: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          accessories?: Json | null
          background?: string
          color?: string
          created_at?: string
          id?: string
          name?: string
          stats?: Json | null
          tutorial_completed?: boolean | null
          unlocked_rooms?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          accessories?: Json | null
          background?: string
          color?: string
          created_at?: string
          id?: string
          name?: string
          stats?: Json | null
          tutorial_completed?: boolean | null
          unlocked_rooms?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_inventory: {
        Row: {
          created_at: string | null
          equipped: boolean | null
          id: string
          item_id: string
          quantity: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          equipped?: boolean | null
          id?: string
          item_id: string
          quantity?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          equipped?: boolean | null
          id?: string
          item_id?: string
          quantity?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_inventory_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "shop_items"
            referencedColumns: ["id"]
          },
        ]
      }
      user_missions: {
        Row: {
          assigned_date: string
          claimed_at: string | null
          completed_at: string | null
          created_at: string
          current_progress: number
          id: string
          is_completed: boolean
          mission_id: string | null
          reward_claimed: boolean
          target_count: number
          user_id: string
        }
        Insert: {
          assigned_date?: string
          claimed_at?: string | null
          completed_at?: string | null
          created_at?: string
          current_progress?: number
          id?: string
          is_completed?: boolean
          mission_id?: string | null
          reward_claimed?: boolean
          target_count: number
          user_id: string
        }
        Update: {
          assigned_date?: string
          claimed_at?: string | null
          completed_at?: string | null
          created_at?: string
          current_progress?: number
          id?: string
          is_completed?: boolean
          mission_id?: string | null
          reward_claimed?: boolean
          target_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_missions_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_owned_characters: {
        Row: {
          character_id: string
          id: string
          purchased_at: string | null
          user_id: string
        }
        Insert: {
          character_id: string
          id?: string
          purchased_at?: string | null
          user_id: string
        }
        Update: {
          character_id?: string
          id?: string
          purchased_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_owned_characters_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      user_pet_data: {
        Row: {
          cleanliness: number
          created_at: string
          current_mood: string
          energy: number
          experience: number
          experience_to_next: number
          happiness: number
          hunger: number
          id: string
          last_played: string | null
          level: number
          pet_name: string
          pi_coins: number
          updated_at: string
          user_id: string
        }
        Insert: {
          cleanliness?: number
          created_at?: string
          current_mood?: string
          energy?: number
          experience?: number
          experience_to_next?: number
          happiness?: number
          hunger?: number
          id?: string
          last_played?: string | null
          level?: number
          pet_name?: string
          pi_coins?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          cleanliness?: number
          created_at?: string
          current_mood?: string
          energy?: number
          experience?: number
          experience_to_next?: number
          happiness?: number
          hunger?: number
          id?: string
          last_played?: string | null
          level?: number
          pet_name?: string
          pi_coins?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          custom_domain: string | null
          daily_streak: number | null
          display_name: string | null
          games_played: number | null
          id: string
          last_daily_claim: string | null
          last_life_regen: string | null
          level: number | null
          lives: number | null
          pi_domain: string | null
          pi_wallet_address: string | null
          plan: string | null
          selected_character_id: string | null
          selected_room: string | null
          total_score: number | null
          tutorial_completed: boolean | null
          updated_at: string | null
          username: string
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          custom_domain?: string | null
          daily_streak?: number | null
          display_name?: string | null
          games_played?: number | null
          id: string
          last_daily_claim?: string | null
          last_life_regen?: string | null
          level?: number | null
          lives?: number | null
          pi_domain?: string | null
          pi_wallet_address?: string | null
          plan?: string | null
          selected_character_id?: string | null
          selected_room?: string | null
          total_score?: number | null
          tutorial_completed?: boolean | null
          updated_at?: string | null
          username: string
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          custom_domain?: string | null
          daily_streak?: number | null
          display_name?: string | null
          games_played?: number | null
          id?: string
          last_daily_claim?: string | null
          last_life_regen?: string | null
          level?: number | null
          lives?: number | null
          pi_domain?: string | null
          pi_wallet_address?: string | null
          plan?: string | null
          selected_character_id?: string | null
          selected_room?: string | null
          total_score?: number | null
          tutorial_completed?: boolean | null
          updated_at?: string | null
          username?: string
          xp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_selected_character_id_fkey"
            columns: ["selected_character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      user_wallet: {
        Row: {
          created_at: string | null
          droplet_coins: number
          id: string
          last_coin_claim: string | null
          pi_balance: number | null
          total_earned: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          droplet_coins?: number
          id?: string
          last_coin_claim?: string | null
          pi_balance?: number | null
          total_earned?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          droplet_coins?: number
          id?: string
          last_coin_claim?: string | null
          pi_balance?: number | null
          total_earned?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      xp_transactions: {
        Row: {
          action_type: string
          created_at: string | null
          description: string | null
          id: string
          user_id: string
          xp_gained: number
        }
        Insert: {
          action_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          user_id: string
          xp_gained: number
        }
        Update: {
          action_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          user_id?: string
          xp_gained?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_droplet_coins: {
        Args: { p_user_id: string; p_coins_to_add: number }
        Returns: undefined
      }
      add_user_life: {
        Args: { user_id: string }
        Returns: undefined
      }
      add_xp: {
        Args: {
          p_user_id: string
          p_xp: number
          p_action_type: string
          p_description?: string
        }
        Returns: Json
      }
      buy_character: {
        Args: { p_user_id: string; p_character_id: string; p_price: number }
        Returns: undefined
      }
      buy_coin_pack: {
        Args: {
          p_user_id: string
          p_pack_id: string
          p_pi_cost: number
          p_coins_given: number
        }
        Returns: undefined
      }
      buy_coin_pack_enhanced: {
        Args: { p_user_id: string; p_pack_id: string }
        Returns: Json
      }
      buy_shop_item: {
        Args: { p_user_id: string; p_item_id: string; p_price_coins: number }
        Returns: undefined
      }
      claim_daily_reward: {
        Args: { p_user_id: string }
        Returns: Json
      }
      claim_mission_reward: {
        Args: { p_user_id: string; p_mission_id: string }
        Returns: Json
      }
      decay_pet_stats: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_daily_missions: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      regenerate_life: {
        Args: { user_id: string }
        Returns: undefined
      }
      toggle_equip_item: {
        Args: { p_user_id: string; p_item_id: string; p_equip: boolean }
        Returns: undefined
      }
      update_mission_progress: {
        Args: {
          p_user_id: string
          p_mission_type: string
          p_increment?: number
        }
        Returns: Json
      }
      use_item: {
        Args: { p_user_id: string; p_item_id: string }
        Returns: Json
      }
      use_user_lives: {
        Args: { user_id: string; amount?: number }
        Returns: undefined
      }
      watch_ad_reward: {
        Args: { p_user_id: string }
        Returns: Json
      }
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
