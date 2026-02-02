import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL oder Anon Key fehlen. Bitte .env.local Datei erstellen.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export type CarStatus = 'available' | 'reserved' | 'maintenance';
export type Transmission = 'Automatic' | 'Manual';
export type Fuel = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';

export interface Car {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year?: number;
  color?: string;
  transmission: Transmission;
  fuel: Fuel;
  seats: number;
  horsepower: number;
  ac: boolean;
  price_per_day: number;
  status: CarStatus;
  location_availability: string[];
  images: string[];
  featured: boolean;
  tags: string[];
  description?: string;
  created_at?: string;
  updated_at?: string;
}

