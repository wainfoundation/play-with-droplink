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
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          pi_user_id: string
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          pi_user_id: string
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          pi_user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      analytics: {
        Row: {
          created_at: string | null
          id: string
          ip_address: string | null
          link_click: boolean | null
          link_id: string | null
          page_view: boolean | null
          referrer: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: string | null
          link_click?: boolean | null
          link_id?: string | null
          page_view?: boolean | null
          referrer?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: string | null
          link_click?: boolean | null
          link_id?: string | null
          page_view?: boolean | null
          referrer?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "links"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_avatar: string | null
          author_name: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          is_featured: boolean
          is_published: boolean
          published_at: string | null
          read_time: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          author_avatar?: string | null
          author_name: string
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          read_time?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          author_avatar?: string | null
          author_name?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          read_time?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      career_applications: {
        Row: {
          additional_info: string | null
          applicant_email: string
          applicant_name: string
          application_status: string
          availability_date: string | null
          cover_letter: string | null
          created_at: string
          id: string
          linkedin_url: string | null
          location: string | null
          phone_number: string | null
          portfolio_url: string | null
          position_title: string
          remote_preference: string | null
          resume_url: string | null
          salary_expectation: string | null
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          additional_info?: string | null
          applicant_email: string
          applicant_name: string
          application_status?: string
          availability_date?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone_number?: string | null
          portfolio_url?: string | null
          position_title: string
          remote_preference?: string | null
          resume_url?: string | null
          salary_expectation?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          additional_info?: string | null
          applicant_email?: string
          applicant_name?: string
          application_status?: string
          availability_date?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone_number?: string | null
          portfolio_url?: string | null
          position_title?: string
          remote_preference?: string | null
          resume_url?: string | null
          salary_expectation?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      chat_quotas: {
        Row: {
          chats_started: number
          date: string
          id: string
          messages_sent: number
          user_id: string
        }
        Insert: {
          chats_started?: number
          date?: string
          id?: string
          messages_sent?: number
          user_id: string
        }
        Update: {
          chats_started?: number
          date?: string
          id?: string
          messages_sent?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_quotas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          last_message_at: string | null
          receiver_id: string
          sender_id: string
          status: string
          tip_amount: number
          unlock_payment_id: string | null
          unlock_transaction_id: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_message_at?: string | null
          receiver_id: string
          sender_id: string
          status?: string
          tip_amount?: number
          unlock_payment_id?: string | null
          unlock_transaction_id?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_message_at?: string | null
          receiver_id?: string
          sender_id?: string
          status?: string
          tip_amount?: number
          unlock_payment_id?: string | null
          unlock_transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
        }
        Relationships: []
      }
      custom_stickers: {
        Row: {
          animation_type: string | null
          background_effect: string | null
          base_image_url: string
          created_at: string
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          overlay_text: string | null
          price_pi: number | null
          text_color: string | null
          text_position: string | null
          text_size: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          animation_type?: string | null
          background_effect?: string | null
          base_image_url: string
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          overlay_text?: string | null
          price_pi?: number | null
          text_color?: string | null
          text_position?: string | null
          text_size?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          animation_type?: string | null
          background_effect?: string | null
          base_image_url?: string
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          overlay_text?: string | null
          price_pi?: number | null
          text_color?: string | null
          text_position?: string | null
          text_size?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      digital_products: {
        Row: {
          category: string | null
          created_at: string
          currency: string
          description: string | null
          download_count: number
          download_expires_hours: number | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          image_url: string | null
          is_active: boolean
          max_downloads: number | null
          price: number
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          download_count?: number
          download_expires_hours?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          max_downloads?: number | null
          price?: number
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          download_count?: number
          download_expires_hours?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          max_downloads?: number | null
          price?: number
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      download_logs: {
        Row: {
          downloaded_at: string | null
          id: string
          ip_address: string | null
          order_id: string | null
          product_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          downloaded_at?: string | null
          id?: string
          ip_address?: string | null
          order_id?: string | null
          product_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          downloaded_at?: string | null
          id?: string
          ip_address?: string | null
          order_id?: string | null
          product_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "download_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "download_logs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_submissions: {
        Row: {
          created_at: string
          feedback: string
          id: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          feedback: string
          id?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          feedback?: string
          id?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      group_invitations: {
        Row: {
          created_at: string
          expires_at: string
          group_id: string
          id: string
          invitee_id: string
          inviter_id: string
          status: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          group_id: string
          id?: string
          invitee_id: string
          inviter_id: string
          status?: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          group_id?: string
          id?: string
          invitee_id?: string
          inviter_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_invitations_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_memberships: {
        Row: {
          expires_at: string | null
          group_id: string
          id: string
          joined_at: string
          payment_id: string | null
          role: string
          status: string
          user_id: string
        }
        Insert: {
          expires_at?: string | null
          group_id: string
          id?: string
          joined_at?: string
          payment_id?: string | null
          role?: string
          status?: string
          user_id: string
        }
        Update: {
          expires_at?: string | null
          group_id?: string
          id?: string
          joined_at?: string
          payment_id?: string | null
          role?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_memberships_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_messages: {
        Row: {
          content: string
          created_at: string
          group_id: string
          id: string
          is_deleted: boolean
          is_edited: boolean
          message_type: string
          reply_to_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          group_id: string
          id?: string
          is_deleted?: boolean
          is_edited?: boolean
          message_type?: string
          reply_to_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          group_id?: string
          id?: string
          is_deleted?: boolean
          is_edited?: boolean
          message_type?: string
          reply_to_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_messages_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "group_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          category: string | null
          created_at: string
          creator_id: string
          currency: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_private: boolean
          max_members: number | null
          member_count: number
          name: string
          price: number
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          creator_id: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_private?: boolean
          max_members?: number | null
          member_count?: number
          name: string
          price?: number
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          creator_id?: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_private?: boolean
          max_members?: number | null
          member_count?: number
          name?: string
          price?: number
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      help_articles: {
        Row: {
          category: string
          content: string
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean
          read_time: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          read_time?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          read_time?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
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
          user_id: string
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
          user_id: string
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
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_id: string
          content: string
          created_at: string
          id: string
          is_deleted: boolean
          is_edited: boolean
          media_type: string | null
          media_url: string | null
          message_type: string
          sender_id: string
          tip_amount: number | null
          tip_payment_id: string | null
          tip_transaction_id: string | null
          updated_at: string
        }
        Insert: {
          chat_id: string
          content: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          is_edited?: boolean
          media_type?: string | null
          media_url?: string | null
          message_type?: string
          sender_id: string
          tip_amount?: number | null
          tip_payment_id?: string | null
          tip_transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          chat_id?: string
          content?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          is_edited?: boolean
          media_type?: string | null
          media_url?: string | null
          message_type?: string
          sender_id?: string
          tip_amount?: number | null
          tip_payment_id?: string | null
          tip_transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          access_token: string | null
          amount: number
          buyer_email: string | null
          buyer_id: string
          created_at: string
          currency: string
          download_count: number | null
          download_expires_at: string | null
          download_link: string | null
          id: string
          max_downloads: number | null
          pi_payment_id: string | null
          pi_transaction_id: string | null
          product_id: string
          seller_id: string
          status: string
          updated_at: string
        }
        Insert: {
          access_token?: string | null
          amount: number
          buyer_email?: string | null
          buyer_id: string
          created_at?: string
          currency?: string
          download_count?: number | null
          download_expires_at?: string | null
          download_link?: string | null
          id?: string
          max_downloads?: number | null
          pi_payment_id?: string | null
          pi_transaction_id?: string | null
          product_id: string
          seller_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          access_token?: string | null
          amount?: number
          buyer_email?: string | null
          buyer_id?: string
          created_at?: string
          currency?: string
          download_count?: number | null
          download_expires_at?: string | null
          download_link?: string | null
          id?: string
          max_downloads?: number | null
          pi_payment_id?: string | null
          pi_transaction_id?: string | null
          product_id?: string
          seller_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          id: string
          memo: string | null
          pi_payment_id: string | null
          pi_transaction_id: string | null
          status: string
          subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string
          id?: string
          memo?: string | null
          pi_payment_id?: string | null
          pi_transaction_id?: string | null
          status: string
          subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          id?: string
          memo?: string | null
          pi_payment_id?: string | null
          pi_transaction_id?: string | null
          status?: string
          subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      pi_profile_imports: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          error_message: string | null
          id: string
          import_status: string
          links_count: number | null
          pi_username: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          import_status?: string
          links_count?: number | null
          pi_username: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          import_status?: string
          links_count?: number | null
          pi_username?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pi_profile_imports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      product_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          created_at: string | null
          id: string
          order_id: string | null
          product_id: string | null
          rating: number | null
          review_text: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          product_id?: string | null
          rating?: number | null
          review_text?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          product_id?: string | null
          rating?: number | null
          review_text?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      stickers_effects: {
        Row: {
          animation_url: string
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          price_pi: number
          updated_at: string
        }
        Insert: {
          animation_url: string
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          price_pi?: number
          updated_at?: string
        }
        Update: {
          animation_url?: string
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          price_pi?: number
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          created_at: string | null
          expires_at: string
          id: string
          is_active: boolean | null
          payment_id: string | null
          plan: string
          started_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          expires_at: string
          id?: string
          is_active?: boolean | null
          payment_id?: string | null
          plan: string
          started_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          expires_at?: string
          id?: string
          is_active?: boolean | null
          payment_id?: string | null
          plan?: string
          started_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      templates: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          is_free: boolean
          name: string
          preview_image_url: string | null
          template_data: Json | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_free?: boolean
          name: string
          preview_image_url?: string | null
          template_data?: Json | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_free?: boolean
          name?: string
          preview_image_url?: string | null
          template_data?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      tips: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string
          from_user_id: string
          id: string
          memo: string | null
          metadata: Json | null
          pi_payment_id: string | null
          pi_transaction_id: string | null
          status: string
          to_user_id: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string
          from_user_id: string
          id?: string
          memo?: string | null
          metadata?: Json | null
          pi_payment_id?: string | null
          pi_transaction_id?: string | null
          status?: string
          to_user_id: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string
          from_user_id?: string
          id?: string
          memo?: string | null
          metadata?: Json | null
          pi_payment_id?: string | null
          pi_transaction_id?: string | null
          status?: string
          to_user_id?: string
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
            foreignKeyName: "tips_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_consents: {
        Row: {
          auth_consent: boolean | null
          consented: boolean
          consented_at: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
          username_consent: boolean | null
          wallet_consent: boolean | null
        }
        Insert: {
          auth_consent?: boolean | null
          consented?: boolean
          consented_at?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
          username_consent?: boolean | null
          wallet_consent?: boolean | null
        }
        Update: {
          auth_consent?: boolean | null
          consented?: boolean
          consented_at?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
          username_consent?: boolean | null
          wallet_consent?: boolean | null
        }
        Relationships: []
      }
      user_metadata: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          title: string | null
          twitter_description: string | null
          twitter_image: string | null
          twitter_title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          title?: string | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          title?: string | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_metadata_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          active_sticker_ids: Json | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          custom_domain: string | null
          display_name: string | null
          id: string
          imported_pi_avatar: string | null
          imported_pi_bio: string | null
          imported_pi_links: Json | null
          pi_domain: string | null
          pi_profile_last_synced: string | null
          pi_wallet_address: string | null
          theme: Json | null
          updated_at: string | null
          username: string
        }
        Insert: {
          active_sticker_ids?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          custom_domain?: string | null
          display_name?: string | null
          id: string
          imported_pi_avatar?: string | null
          imported_pi_bio?: string | null
          imported_pi_links?: Json | null
          pi_domain?: string | null
          pi_profile_last_synced?: string | null
          pi_wallet_address?: string | null
          theme?: Json | null
          updated_at?: string | null
          username: string
        }
        Update: {
          active_sticker_ids?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          custom_domain?: string | null
          display_name?: string | null
          id?: string
          imported_pi_avatar?: string | null
          imported_pi_bio?: string | null
          imported_pi_links?: Json | null
          pi_domain?: string | null
          pi_profile_last_synced?: string | null
          pi_wallet_address?: string | null
          theme?: Json | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      user_stickers: {
        Row: {
          id: string
          pi_payment_id: string | null
          pi_transaction_id: string | null
          sticker_id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          id?: string
          pi_payment_id?: string | null
          pi_transaction_id?: string | null
          sticker_id: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          id?: string
          pi_payment_id?: string | null
          pi_transaction_id?: string | null
          sticker_id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stickers_sticker_id_fkey"
            columns: ["sticker_id"]
            isOneToOne: false
            referencedRelation: "stickers_effects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_stickers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_download_product: {
        Args: { order_id_param: string }
        Returns: boolean
      }
      can_send_message: {
        Args: { user_id_param: string }
        Returns: boolean
      }
      can_start_chat: {
        Args: { user_id_param: string }
        Returns: boolean
      }
      generate_download_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_or_create_daily_quota: {
        Args: { user_id_param: string }
        Returns: {
          chats_started: number
          date: string
          id: string
          messages_sent: number
          user_id: string
        }
      }
      get_total_tips_received: {
        Args: Record<PropertyKey, never> | { user_id_param: string }
        Returns: number
      }
      get_user_tips_received: {
        Args: { user_id_param: string }
        Returns: number
      }
      get_user_tips_sent: {
        Args: { user_id_param: string }
        Returns: number
      }
      update_user_custom_domain: {
        Args: { user_id: string; domain_value: string }
        Returns: Json
      }
      update_user_domain: {
        Args: { user_id: string; domain_field: string; domain_value: string }
        Returns: Json
      }
      update_user_pi_domain: {
        Args: { user_id: string; domain_value: string }
        Returns: Json
      }
      user_owns_sticker: {
        Args: { user_id_param: string; sticker_id_param: string }
        Returns: boolean
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
