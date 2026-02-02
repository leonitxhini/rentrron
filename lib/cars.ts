import { supabase, type Car as SupabaseCar } from './supabase';
import { Car } from '@/data/cars';

// Konvertiere Supabase Car zu Frontend Car Format
export function convertSupabaseCarToFrontend(supabaseCar: SupabaseCar): Car {
  return {
    id: supabaseCar.id,
    slug: supabaseCar.slug,
    name: supabaseCar.name,
    brand: supabaseCar.brand,
    model: supabaseCar.model,
    pricePerDay: supabaseCar.price_per_day,
    transmission: supabaseCar.transmission,
    fuel: supabaseCar.fuel,
    seats: supabaseCar.seats,
    horsepower: supabaseCar.horsepower,
    ac: supabaseCar.ac,
    locationAvailability: supabaseCar.location_availability,
    images: supabaseCar.images,
    featured: supabaseCar.featured,
    tags: supabaseCar.tags,
    description: supabaseCar.description,
  };
}

// Lade alle Autos aus Supabase
export async function getCarsFromSupabase(): Promise<Car[]> {
  try {
    // Lade ALLE Autos - explizit hohes Limit setzen
    const { data, error, count } = await supabase
      .from('cars')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(10000); // Sehr hohes Limit

    if (error) {
      console.error('Fehler beim Laden der Autos aus Supabase:', error);
      // Fallback zu Mock-Daten bei Fehler
      const { cars } = await import('@/data/cars');
      return cars;
    }

    if (!data || data.length === 0) {
      // Fallback zu Mock-Daten wenn keine Daten vorhanden
      const { cars } = await import('@/data/cars');
      return cars;
    }

    console.log(`lib/cars: Geladene ${data.length} von ${count || 'unbekannt'} Autos`);
    
    if (count && data.length < count) {
      console.warn(`⚠️ WARNUNG: Nur ${data.length} von ${count} Autos wurden geladen!`);
    }

    return data.map(convertSupabaseCarToFrontend);
  } catch (error) {
    console.error('Fehler beim Laden der Autos:', error);
    // Fallback zu Mock-Daten bei Fehler
    const { cars } = await import('@/data/cars');
    return cars;
  }
}

// Lade featured Autos
export async function getFeaturedCarsFromSupabase(): Promise<Car[]> {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fehler beim Laden der Featured Autos:', error);
      const { getFeaturedCars } = await import('@/data/cars');
      return getFeaturedCars();
    }

    if (!data || data.length === 0) {
      const { getFeaturedCars } = await import('@/data/cars');
      return getFeaturedCars();
    }

    return data.map(convertSupabaseCarToFrontend);
  } catch (error) {
    console.error('Fehler beim Laden der Featured Autos:', error);
    const { getFeaturedCars } = await import('@/data/cars');
    return getFeaturedCars();
  }
}

// Lade Auto nach Slug
export async function getCarBySlugFromSupabase(slug: string): Promise<Car | null> {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      console.error('Fehler beim Laden des Autos:', error);
      const { getCarBySlug } = await import('@/data/cars');
      return getCarBySlug(slug) || null;
    }

    return convertSupabaseCarToFrontend(data);
  } catch (error) {
    console.error('Fehler beim Laden des Autos:', error);
    const { getCarBySlug } = await import('@/data/cars');
    return getCarBySlug(slug) || null;
  }
}

