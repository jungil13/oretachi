export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type TableDef<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      reservations: TableDef<
        {
          id: string;
          name: string;
          email: string;
          phone: string;
          guests: number;
          date: string;
          time: string;
          special_request: string | null;
          status: string;
          preorder: Json | null;
          created_at: string;
        },
        {
          id?: string;
          name: string;
          email: string;
          phone: string;
          guests: number;
          date: string;
          time: string;
          special_request?: string | null;
          status?: string;
          preorder?: Json | null;
          created_at?: string;
        },
        Partial<{
          id?: string;
          name: string;
          email: string;
          phone: string;
          guests: number;
          date: string;
          time: string;
          special_request?: string | null;
          status?: string;
          preorder?: Json | null;
          created_at?: string;
        }>
      >;
      menu_items: TableDef<
        {
          id: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          category: string;
          spice_level: number;
          featured: boolean;
          created_at: string;
        },
        {
          id?: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          category: string;
          spice_level?: number;
          featured?: boolean;
          created_at?: string;
        },
        Partial<{
          id?: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          category: string;
          spice_level?: number;
          featured?: boolean;
          created_at?: string;
        }>
      >;
      gallery: TableDef<
        {
          id: string;
          image_url: string;
          category: string;
          title: string;
          created_at: string;
        },
        {
          id?: string;
          image_url: string;
          category: string;
          title: string;
          created_at?: string;
        },
        Partial<{
          id?: string;
          image_url: string;
          category: string;
          title: string;
          created_at?: string;
        }>
      >;
      reviews: TableDef<
        {
          id: string;
          name: string;
          rating: number;
          review: string;
          image_url: string | null;
          created_at: string;
        },
        {
          id?: string;
          name: string;
          rating: number;
          review: string;
          image_url?: string | null;
          created_at?: string;
        },
        Partial<{
          id?: string;
          name: string;
          rating: number;
          review: string;
          image_url?: string | null;
          created_at?: string;
        }>
      >;
      events: TableDef<
        {
          id: string;
          title: string;
          description: string;
          image_url: string;
          event_date: string;
          created_at: string;
        },
        {
          id?: string;
          title: string;
          description: string;
          image_url: string;
          event_date: string;
          created_at?: string;
        },
        Partial<{
          id?: string;
          title: string;
          description: string;
          image_url: string;
          event_date: string;
          created_at?: string;
        }>
      >;
      contact_messages: TableDef<
        {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          reply: string | null;
          replied_at: string | null;
          created_at: string;
        },
        {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          reply?: string | null;
          replied_at?: string | null;
          created_at?: string;
        },
        Partial<{
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          reply?: string | null;
          replied_at?: string | null;
          created_at?: string;
        }>
      >;
      newsletter_subscribers: TableDef<
        {
          id: string;
          email: string;
          created_at: string;
        },
        {
          id?: string;
          email: string;
          created_at?: string;
        },
        Partial<{
          id?: string;
          email: string;
          created_at?: string;
        }>
      >;
      team_members: TableDef<
        {
          id: string;
          name: string;
          role: string;
          image_url: string;
          created_at: string;
        },
        {
          id?: string;
          name: string;
          role: string;
          image_url: string;
          created_at?: string;
        },
        Partial<{
          id?: string;
          name: string;
          role: string;
          image_url: string;
          created_at?: string;
        }>
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
