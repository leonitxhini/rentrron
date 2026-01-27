export type Transmission = 'Automatic' | 'Manual';
export type Fuel = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type Location = 'Ferizaj' | 'Prishtina Airport' | 'Skopje Airport';

export interface Car {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  pricePerDay: number;
  transmission: Transmission;
  fuel: Fuel;
  seats: number;
  horsepower: number;
  ac: boolean;
  locationAvailability: Location[];
  images: string[];
  featured: boolean;
  tags: string[];
  description?: string;
}

export const cars: Car[] = [
  {
    id: '1',
    slug: 'audi-a6',
    name: 'Audi A6',
    brand: 'Audi',
    model: 'A6',
    pricePerDay: 85,
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    horsepower: 245,
    ac: true,
    locationAvailability: ['Ferizaj', 'Prishtina Airport', 'Skopje Airport'],
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
    ],
    featured: true,
    tags: ['premium', 'airport', 'popular'],
  },
  {
    id: '2',
    slug: 'audi-a5',
    name: 'Audi A5',
    brand: 'Audi',
    model: 'A5',
    pricePerDay: 75,
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    horsepower: 190,
    ac: true,
    locationAvailability: ['Ferizaj', 'Prishtina Airport'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
    ],
    featured: true,
    tags: ['premium', 'popular'],
  },
  {
    id: '3',
    slug: 'audi-a3',
    name: 'Audi A3',
    brand: 'Audi',
    model: 'A3',
    pricePerDay: 60,
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    horsepower: 150,
    ac: true,
    locationAvailability: ['Ferizaj', 'Prishtina Airport', 'Skopje Airport'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
    ],
    featured: true,
    tags: ['premium', 'airport'],
  },
  {
    id: '4',
    slug: 'vw-golf-8',
    name: 'VW Golf 8',
    brand: 'Volkswagen',
    model: 'Golf 8',
    pricePerDay: 50,
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    horsepower: 150,
    ac: true,
    locationAvailability: ['Ferizaj', 'Prishtina Airport'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
    ],
    featured: true,
    tags: ['popular', 'airport'],
  },
  {
    id: '5',
    slug: 'peugeot-308',
    name: 'Peugeot 308',
    brand: 'Peugeot',
    model: '308',
    pricePerDay: 45,
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 5,
    horsepower: 130,
    ac: true,
    locationAvailability: ['Ferizaj', 'Skopje Airport'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
    ],
    featured: true,
    tags: ['popular'],
  },
  {
    id: '6',
    slug: 'peugeot-208',
    name: 'Peugeot 208',
    brand: 'Peugeot',
    model: '208',
    pricePerDay: 40,
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    horsepower: 100,
    ac: true,
    locationAvailability: ['Ferizaj', 'Prishtina Airport', 'Skopje Airport'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
    ],
    featured: true,
    tags: ['popular', 'airport'],
  },
  {
    id: '7',
    slug: 'bmw-3-series',
    name: 'BMW 3 Series',
    brand: 'BMW',
    model: '3 Series',
    pricePerDay: 80,
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    horsepower: 184,
    ac: true,
    locationAvailability: ['Ferizaj', 'Prishtina Airport'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
    ],
    featured: false,
    tags: ['premium'],
  },
  {
    id: '8',
    slug: 'mercedes-c-class',
    name: 'Mercedes C-Class',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    pricePerDay: 90,
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    horsepower: 204,
    ac: true,
    locationAvailability: ['Ferizaj', 'Prishtina Airport', 'Skopje Airport'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
    ],
    featured: false,
    tags: ['premium', 'airport'],
  },
  {
    id: '9',
    slug: 'skoda-octavia',
    name: 'Skoda Octavia',
    brand: 'Skoda',
    model: 'Octavia',
    pricePerDay: 55,
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 5,
    horsepower: 150,
    ac: true,
    locationAvailability: ['Ferizaj', 'Prishtina Airport'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
    ],
    featured: false,
    tags: ['popular'],
  },
  {
    id: '10',
    slug: 'ford-focus',
    name: 'Ford Focus',
    brand: 'Ford',
    model: 'Focus',
    pricePerDay: 42,
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    horsepower: 125,
    ac: true,
    locationAvailability: ['Ferizaj', 'Skopje Airport'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
    ],
    featured: false,
    tags: [],
  },
  {
    id: '11',
    slug: 'opel-astra',
    name: 'Opel Astra',
    brand: 'Opel',
    model: 'Astra',
    pricePerDay: 38,
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    horsepower: 110,
    ac: true,
    locationAvailability: ['Ferizaj', 'Prishtina Airport'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
    ],
    featured: false,
    tags: [],
  },
  {
    id: '12',
    slug: 'toyota-rav4',
    name: 'Toyota RAV4',
    brand: 'Toyota',
    model: 'RAV4',
    pricePerDay: 70,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    seats: 5,
    horsepower: 219,
    ac: true,
    locationAvailability: ['Ferizaj', 'Prishtina Airport', 'Skopje Airport'],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786e0c35?w=800',
    ],
    featured: false,
    tags: ['premium', 'airport'],
  },
];

export const getCarBySlug = (slug: string): Car | undefined => {
  return cars.find((car) => car.slug === slug);
};

export const getFeaturedCars = (): Car[] => {
  return cars.filter((car) => car.featured);
};

