-- Migration Script: Execute this in your Supabase SQL Editor
-- Link: https://supabase.com/dashboard/project/dysmgagcfzetasefbjxb/sql/new

-- 1. Add preorder JSONB column to reservations
ALTER TABLE reservations 
ADD COLUMN IF NOT EXISTS preorder JSONB DEFAULT '[]'::jsonb;

-- 2. Add reply and replied_at columns to contact_messages
ALTER TABLE contact_messages 
ADD COLUMN IF NOT EXISTS reply TEXT,
ADD COLUMN IF NOT EXISTS replied_at TIMESTAMPTZ;
