-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Admin all team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');

-- Seed initial data
INSERT INTO team_members (name, role, image_url) VALUES
('RETUYA, VINCENT ANTHONY', 'RESTAURANT MANAGER', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80'),
('ANAHAW, CHRISTIAN JAY SALGARINO', 'SHIFT MANAGER', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80'),
('ALMENDRAS, JEFFREY INOC JR.', 'SHIFT MANAGER', 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80'),
('NAVARRO, JEROND CARL RABOY', 'KITCHEN CREW', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'),
('BITANG, JIMBE ANTIGUA', 'KITCHEN CREW', 'https://images.unsplash.com/photo-1544168190-79c15427015f?w=400&q=80'),
('GORGONIO, MARK NINVER', 'HEAD COOK', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80'),
('ORTEGA, JULIUS BALANSAG', 'HEAD COOK', 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=400&q=80'),
('BAGUIO, JOSHUA VENTURA', 'DINING CREW', 'https://images.unsplash.com/photo-1541271696563-3be2f555fc4e?w=400&q=80'),
('BIYONG, MONICA JEAN LEGASPINA', 'DINING CREW', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80'),
('ROMANO, LIGAYA VERDIDA', 'DINING CREW', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'),
('PAGOBO, STEPHEN EDUARD SALADUGA', 'DINING CREW', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'),
('CAMACHO, JIB PACALDO', 'BARISTA', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80'),
('BRAVO, FRANK', 'BARISTA', 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?w=400&q=80'),
('BOHOL, ELLAIN MHAE', 'CASHIER', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80'),
('SOSA, KIMBERLY ARELLANO', 'CASHIER', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80'),
('TAMPOS, NIÑO', 'BACK-UP CREW', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80'),
('MEJIAS, RODEL BETAGANSO', 'BACK-UP CREW', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80');
