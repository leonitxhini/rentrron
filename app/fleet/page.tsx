'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { Car } from '@/data/cars';
import { ChevronDown, Settings, Users, Fuel as FuelIcon, ArrowRight, Check } from 'lucide-react';
import { RentNowModal } from '@/components/RentNowModal';
import Image from 'next/image';
import { getCarsFromSupabase } from '@/lib/cars';

type SortOption = 'popular' | 'priceLow' | 'priceHigh' | 'newest';
type PriceFilter = 'all' | 'low' | 'medium' | 'high';
type ManufactureFilter = string[];
type TypeFilter = string[];
type FilterType = 'price' | 'manufacture' | 'type' | 'rating' | null;

export default function FleetPage() {
  const { t } = useLanguage();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [manufactureFilter, setManufactureFilter] = useState<ManufactureFilter>([]);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>([]);
  const [ratingFilter, setRatingFilter] = useState<string>('');
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        console.log('Fleet: Starte Laden der Autos...');
        const loadedCars = await getCarsFromSupabase();
        console.log('Fleet: Geladene Autos:', loadedCars.length);
        console.log('Fleet: Autos:', loadedCars.map(c => `${c.brand} ${c.model}`));
        
        if (loadedCars.length === 0) {
          console.warn('Fleet: Keine Autos geladen, verwende Mock-Daten');
          // Fallback zu Mock-Daten wenn keine Daten vorhanden
          const { cars: mockCars } = await import('@/data/cars');
          setCars(mockCars);
        } else {
          setCars(loadedCars);
        }
      } catch (error) {
        console.error('Fleet: Fehler beim Laden der Autos:', error);
        // Fallback zu Mock-Daten bei Fehler
        const { cars: mockCars } = await import('@/data/cars');
        console.log('Fleet: Verwende Mock-Daten als Fallback:', mockCars.length);
        setCars(mockCars);
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  const brands = Array.from(new Set(cars.map(car => car.brand)));
  const types = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Sport'];

  const filteredCars = useMemo(() => {
    let filtered = cars;

    // Price filter
    if (priceFilter === 'low') {
      filtered = filtered.filter(car => car.pricePerDay < 50);
    } else if (priceFilter === 'medium') {
      filtered = filtered.filter(car => car.pricePerDay >= 50 && car.pricePerDay < 80);
    } else if (priceFilter === 'high') {
      filtered = filtered.filter(car => car.pricePerDay >= 80);
    }

    // Manufacture filter
    if (manufactureFilter.length > 0) {
      filtered = filtered.filter(car => manufactureFilter.includes(car.brand));
    }

    // Type filter (simplified - based on tags and seats)
    if (typeFilter.length > 0) {
      filtered = filtered.filter(car => {
        if (typeFilter.includes('Sport') && car.tags.includes('premium')) return true;
        if (typeFilter.includes('Sedan') && car.seats >= 5 && !car.tags.includes('premium')) return true;
        if (typeFilter.includes('SUV') && car.seats >= 7) return true;
        if (typeFilter.includes('Hatchback') && car.seats <= 4) return true;
        if (typeFilter.includes('Coupe') && car.seats <= 4) return true;
        return false;
      });
    }

    console.log('Fleet: Gefilterte Autos:', filtered.length);
    return filtered;
  }, [cars, priceFilter, manufactureFilter, typeFilter]);

  const handleRentNow = (car: Car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const toggleManufacture = (brand: string) => {
    setManufactureFilter(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleType = (type: string) => {
    setTypeFilter(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <main className="relative min-h-screen bg-[#0A1929]">
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Title Section */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{t.fleet.carCatalogue}</h1>
              <p className="text-white/80 text-base sm:text-lg font-medium">{t.fleet.exploreCars}</p>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Price Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenFilter(openFilter === 'price' ? null : 'price')}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 pr-7 sm:pr-8 border-2 border-white/20 rounded-lg text-white text-sm sm:text-base font-semibold cursor-pointer hover:border-accent focus:outline-none bg-white/10 backdrop-blur-sm shadow-sm flex items-center gap-2"
                >
                  <span>{t.fleet.price}</span>
                  <ChevronDown size={18} className={`absolute right-2.5 top-1/2 -translate-y-1/2 transition-transform ${openFilter === 'price' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFilter === 'price' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-lg shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-2">
                        {['all', 'low', 'medium', 'high'].map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setPriceFilter(option as PriceFilter);
                              setOpenFilter(null);
                            }}
                            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                              priceFilter === option
                                ? 'bg-accent/20 text-white'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <span className="capitalize font-medium">
                              {option === 'all' ? t.fleet.allPrices : option === 'low' ? t.fleet.low : option === 'medium' ? t.fleet.medium : t.fleet.high}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Manufacture Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenFilter(openFilter === 'manufacture' ? null : 'manufacture')}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 pr-7 sm:pr-8 border-2 border-white/20 rounded-lg text-white text-sm sm:text-base font-semibold cursor-pointer hover:border-accent focus:outline-none bg-white/10 backdrop-blur-sm shadow-sm flex items-center gap-2"
                >
                  <span>{t.fleet.manufacture}</span>
                  {manufactureFilter.length > 0 && (
                    <span className="w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {manufactureFilter.length}
                    </span>
                  )}
                  <ChevronDown size={18} className={`absolute right-2.5 top-1/2 -translate-y-1/2 transition-transform ${openFilter === 'manufacture' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFilter === 'manufacture' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-lg shadow-2xl z-50 overflow-hidden max-h-96"
                    >
                      <div className="p-2 max-h-96 overflow-y-auto">
                        {brands.map((brand) => {
                          const isSelected = manufactureFilter.includes(brand);
                          return (
                            <button
                              key={brand}
                              onClick={() => toggleManufacture(brand)}
                              className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-accent/20 text-white'
                                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              <span className="font-medium">{brand}</span>
                              {isSelected && <Check size={18} className="text-accent" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Type Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenFilter(openFilter === 'type' ? null : 'type')}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 pr-7 sm:pr-8 border-2 border-white/20 rounded-lg text-white text-sm sm:text-base font-semibold cursor-pointer hover:border-accent focus:outline-none bg-white/10 backdrop-blur-sm shadow-sm flex items-center gap-2"
                >
                  <span>{t.fleet.type}</span>
                  {typeFilter.length > 0 && (
                    <span className="w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {typeFilter.length}
                    </span>
                  )}
                  <ChevronDown size={18} className={`absolute right-2.5 top-1/2 -translate-y-1/2 transition-transform ${openFilter === 'type' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFilter === 'type' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-lg shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-2">
                        {types.map((type) => {
                          const isSelected = typeFilter.includes(type);
                          return (
                            <button
                              key={type}
                              onClick={() => toggleType(type)}
                              className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-accent/20 text-white'
                                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              <span className="font-medium">{type}</span>
                              {isSelected && <Check size={18} className="text-accent" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Rating Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenFilter(openFilter === 'rating' ? null : 'rating')}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 pr-7 sm:pr-8 border-2 border-white/20 rounded-lg text-white text-sm sm:text-base font-semibold cursor-pointer hover:border-accent focus:outline-none bg-white/10 backdrop-blur-sm shadow-sm flex items-center gap-2"
                >
                  <span>{t.fleet.rating}</span>
                  <ChevronDown size={18} className={`absolute right-2.5 top-1/2 -translate-y-1/2 transition-transform ${openFilter === 'rating' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFilter === 'rating' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-lg shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-2">
                        {['', '5', '4', '3'].map((rating) => (
                          <button
                            key={rating || 'all'}
                            onClick={() => {
                              setRatingFilter(rating);
                              setOpenFilter(null);
                            }}
                            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                              ratingFilter === rating
                                ? 'bg-accent/20 text-white'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <span className="font-medium">{rating ? `${rating}+ ${t.fleet.stars}` : t.fleet.allRatings}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Click outside to close dropdowns */}
          {openFilter && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpenFilter(null)}
            />
          )}

          {/* Cars Grid */}
          {loading ? (
            <div className="text-center py-12 sm:py-20">
              <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-white"></div>
              <p className="text-white mt-4 text-sm sm:text-base">Lade Fahrzeuge...</p>
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-semibold text-white">{t.fleet.noVehiclesFound}</p>
              <p className="text-white/70 mt-2">{t.fleet.tryAdjustingFilters}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredCars.map((car, index) => {
                // Calculate MPG (simplified - based on fuel type)
                const mpg = car.fuel === 'Electric' ? 0 : car.fuel === 'Hybrid' ? 45 : car.fuel === 'Diesel' ? 35 : 28;
                
                return (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    {/* Car Card */}
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border-2 border-white/10 hover:border-accent/50">
                      {/* Image Container */}
                      <div className="relative w-full h-48 overflow-hidden bg-gray-900">
                        <Image
                          src={car.images[0] || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600'}
                          alt={car.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/80 via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col bg-white/5 backdrop-blur-sm">
                        <div className="mb-3">
                          <h3 className="text-xl font-bold text-white mb-2">{car.name}</h3>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-white">€{car.pricePerDay}</span>
                            <span className="text-base text-white/80 font-medium">/day</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex items-center gap-4 mb-5 text-sm">
                          <div className="flex items-center gap-1.5 text-white/90">
                            <Settings size={18} className="text-accent" />
                            <span className="font-medium">{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-white/90">
                            <Users size={18} className="text-accent" />
                            <span className="font-medium">{car.seats} Seats</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-white/90">
                            <FuelIcon size={18} className="text-accent" />
                            <span className="font-medium">{mpg} MPG</span>
                          </div>
                        </div>

                        {/* Rent Now Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRentNow(car)}
                          className="w-full mt-auto px-4 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl hover:shadow-purple-500/30 text-base"
                        >
                          <span>{t.fleet.rentNow}</span>
                          <ArrowRight size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>


      <RentNowModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCar(null);
        }}
        car={selectedCar}
      />
    </main>
  );
}

