-- Fix RLS Policies für anonyme Benutzer
-- Führen Sie diese SQL-Befehle im Supabase SQL Editor aus

-- Lösche alte Policies falls vorhanden
DROP POLICY IF EXISTS "Public cars are viewable by everyone" ON cars;
DROP POLICY IF EXISTS "Admin can do everything" ON cars;

-- Erlaube SELECT für alle (auch anonyme Benutzer)
CREATE POLICY "Public cars are viewable by everyone"
  ON cars FOR SELECT
  USING (true);

-- Erlaube INSERT für alle (auch anonyme Benutzer)
CREATE POLICY "Public can insert cars"
  ON cars FOR INSERT
  WITH CHECK (true);

-- Erlaube UPDATE für alle (auch anonyme Benutzer)
CREATE POLICY "Public can update cars"
  ON cars FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Erlaube DELETE für alle (auch anonyme Benutzer)
CREATE POLICY "Public can delete cars"
  ON cars FOR DELETE
  USING (true);

