-- Run this in your Supabase SQL Editor to add the social_posts table

CREATE TABLE IF NOT EXISTS social_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  embed_code TEXT NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read social_posts" ON social_posts FOR SELECT USING (true);
CREATE POLICY "Admin all social_posts" ON social_posts FOR ALL USING (auth.role() = 'authenticated');
