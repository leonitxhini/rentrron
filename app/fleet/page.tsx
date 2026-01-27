'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarCard } from '@/components/CarCard';
import { useLanguage } from '@/components/LanguageProvider';
import { cars, Car, Transmission, Fuel, Location } from '@/data/cars';
import { Filter, X, Compare } from 'lucide-react';
import { BookingModal } from '@/components/BookingModal';

type SortOption = 'popular' | 'priceLow' | 'priceHigh' | 'newest';

export default function FleetPage() {
  const { t } = useLanguage();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission | ''>('');
  const [selectedFuel, setSelectedFuel] = useState<Fuel | ''>('');
  const [selectedLocation, setSelectedLocation] = useState<Location | ''>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [compareCars, setCompareCars] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string>('');

  const brands = Array.from(new Set(cars.map((car) => car.brand)));

  const filteredAndSortedCars = useMemo(() => {
    let filtered = cars.filter((car) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(car.brand)) {
        return false;
      }
      if (selectedTransmission && car.transmission !== selectedTransmission) {
        return false;
      }
      if (selectedFuel && car.fuel !== selectedFuel) {
        return false;
      }
      if (selectedLocation && !car.locationAvailability.includes(selectedLocation)) {
        return false;
      }
      if (car.pricePerDay < priceRange[0] || car.pricePerDay > priceRange[1]) {
        return false;
      }
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priceLow':
          return a.pricePerDay - b.pricePerDay;
        case 'priceHigh':
          return b.pricePerDay - a.pricePerDay;
        case 'popular':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'newest':
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedBrands, selectedTransmission, selectedFuel, selectedLocation, priceRange, sortBy]);

  const toggleCompare = (carId: string) => {
    setCompareCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : prev.length < 3
        ? [...prev, carId]
        : prev
    );
  };

  const compareCarsData = cars.filter((car) => compareCars.includes(car.id));

  const handleQuickBook = (carName: string) => {
    setSelectedCar(carName);
    setBookingModalOpen(true);
  };

  return (
    <main className="relative min-h-screen">
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.nav.fleet}</h1>
          </motion.div>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="glass rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">{t.fleet.filters}</h2>

                <div className="space-y-6">
                  {/* Brands */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Brand</label>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <label key={brand} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={(e) =>
                              setSelectedBrands(
                                e.target.checked
                                  ? [...selectedBrands, brand]
                                  : selectedBrands.filter((b) => b !== brand)
                              )
                            }
                            className="w-4 h-4 accent-accent"
                          />
                          <span>{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Transmission */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.carDetails.transmission}
                    </label>
                    <select
                      value={selectedTransmission}
                      onChange={(e) => setSelectedTransmission(e.target.value as Transmission | '')}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    >
                      <option value="">All</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>

                  {/* Fuel */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.carDetails.fuel}</label>
                    <select
                      value={selectedFuel}
                      onChange={(e) => setSelectedFuel(e.target.value as Fuel | '')}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    >
                      <option value="">All</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price: €{priceRange[0]} - €{priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setSelectedBrands([]);
                      setSelectedTransmission('');
                      setSelectedFuel('');
                      setSelectedLocation('');
                      setPriceRange([0, 100]);
                    }}
                    className="w-full px-4 py-2 glass border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filters Button */}
              <div className="lg:hidden mb-6 flex items-center justify-between">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-lg"
                >
                  <Filter size={20} />
                  {t.fleet.filters}
                </button>
                {compareCars.length > 0 && (
                  <button
                    onClick={() => setCompareOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-bold rounded-lg"
                  >
                    <Compare size={20} />
                    Compare ({compareCars.length})
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-white/70">
                  {filteredAndSortedCars.length} {t.fleet.noResults.split(' ')[0]} found
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 glass border border-white/10 rounded-lg text-white"
                >
                  <option value="popular">{t.fleet.sortOptions.popular}</option>
                  <option value="priceLow">{t.fleet.sortOptions.priceLow}</option>
                  <option value="priceHigh">{t.fleet.sortOptions.priceHigh}</option>
                  <option value="newest">{t.fleet.sortOptions.newest}</option>
                </select>
              </div>

              {/* Cars Grid */}
              {filteredAndSortedCars.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-white/70">{t.fleet.noResults}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedCars.map((car, index) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="relative">
                        <CarCard
                          car={car}
                          onQuickBook={() => handleQuickBook(car.name)}
                        />
                        <button
                          onClick={() => toggleCompare(car.id)}
                          className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            compareCars.includes(car.id)
                              ? 'bg-accent text-white'
                              : 'glass border border-white/20'
                          }`}
                        >
                          {compareCars.includes(car.id) ? '✓ Compare' : t.fleet.compare}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 bottom-0 w-80 glass-strong z-50 p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t.fleet.filters}</h2>
                <button onClick={() => setFiltersOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              {/* Same filter content as desktop */}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      <AnimatePresence>
        {compareOpen && compareCarsData.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCompareOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-6xl md:w-full z-50 glass-strong rounded-2xl p-6 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Compare Cars</h2>
                <button onClick={() => setCompareOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {compareCarsData.map((car) => (
                  <div key={car.id} className="glass rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                    <p className="text-accent text-2xl font-bold mb-4">
                      €{car.pricePerDay}/day
                    </p>
                    <div className="space-y-2 text-sm">
                      <p>{t.carDetails.transmission}: {car.transmission}</p>
                      <p>{t.carDetails.fuel}: {car.fuel}</p>
                      <p>{t.carDetails.seats}: {car.seats}</p>
                      <p>{t.carDetails.horsepower}: {car.horsepower} HP</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setSelectedCar('');
        }}
        carName={selectedCar}
      />
    </main>
  );
}

