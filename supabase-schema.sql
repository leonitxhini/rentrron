-- RRON Rent A Car - Database Schema
-- Run this in your Supabase SQL Editor

-- Create enum for car status
CREATE TYPE car_status AS ENUM ('available', 'reserved', 'maintenance');

-- Create cars table
CREATE TABLE cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  color TEXT,
  transmission TEXT NOT NULL CHECK (transmission IN ('Automatic', 'Manual')),
  fuel TEXT NOT NULL CHECK (fuel IN ('Petrol', 'Diesel', 'Hybrid', 'Electric')),
  seats INTEGER NOT NULL DEFAULT 5,
  horsepower INTEGER NOT NULL,
  ac BOOLEAN DEFAULT true,
  price_per_day INTEGER NOT NULL,
  status car_status DEFAULT 'available',
  location_availability TEXT[] DEFAULT ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'],
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_cars_slug ON cars(slug);
CREATE INDEX idx_cars_featured ON cars(featured);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to all cars
CREATE POLICY "Public cars are viewable by everyone"
  ON cars FOR SELECT
  USING (true);

-- Policy: Allow authenticated users (admin) to do everything
-- Note: Since we're using password-based auth, we'll allow all operations
-- In production, you might want to restrict this further
CREATE POLICY "Admin can do everything"
  ON cars FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert sample data from existing cars
-- IDs werden automatisch von der DB generiert (gen_random_uuid())
INSERT INTO cars (slug, name, brand, model, year, color, transmission, fuel, seats, horsepower, ac, price_per_day, location_availability, images, featured, tags, description, status)
VALUES
  ('audi-a6-2021-white', 'Audi A6', 'Audi', 'A6', 2021, 'White', 'Automatic', 'Petrol', 5, 245, true, 60, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/audi-a6-2021-white.png'], true, ARRAY['premium', 'airport', 'popular'], 'Audi A6 2021 - White - Automatic', 'available'),
  ('audi-a5-2021-dark-blue', 'Audi A5', 'Audi', 'A5', 2021, 'Dark Blue', 'Automatic', 'Petrol', 5, 190, true, 75, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/audi-a5-2021-dark-blue.png'], true, ARRAY['premium', 'popular'], 'Audi A5 2021 - Dark Blue - Automatic', 'available'),
  ('audi-a3-2015-black', 'Audi A3', 'Audi', 'A3', 2015, 'Black', 'Automatic', 'Petrol', 5, 150, true, 60, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/audi-a3-2015-black.png'], true, ARRAY['premium', 'airport'], 'Audi A3 2015 - Black - Automatic', 'available'),
  ('audi-a3-2018-light-grey', 'Audi A3', 'Audi', 'A3', 2018, 'Light Grey', 'Automatic', 'Petrol', 5, 150, true, 60, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/audi-a3-2018-light-grey.png'], true, ARRAY['premium', 'airport'], 'Audi A3 2018 - Light Grey - Automatic', 'available'),
  ('vw-golf-8-black', 'VW Golf 8', 'Volkswagen', 'Golf 8', 2020, 'Black', 'Automatic', 'Petrol', 5, 150, true, 50, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/vw-golf-8-black.png'], true, ARRAY['popular', 'airport'], 'VW Golf 8 - Black - Automatic', 'available'),
  ('vw-golf-8-light-grey', 'VW Golf 8', 'Volkswagen', 'Golf 8', 2020, 'Light Grey', 'Automatic', 'Petrol', 5, 150, true, 50, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/vw-golf-8-light-grey.png'], true, ARRAY['popular', 'airport'], 'VW Golf 8 - Light Grey - Automatic', 'available');

