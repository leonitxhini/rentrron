'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Settings, Fuel as FuelIcon, ArrowRight, Heart } from 'lucide-react';
import { Car } from '@/data/cars';
import { useLanguage } from './LanguageProvider';
import { RentNowModal } from './RentNowModal';
import { getFeaturedCarsFromSupabase } from '@/lib/cars';

export function MostSearchedCars() {
  const { t } = useLanguage();
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      try {
        // Lade alle Autos
        const { getCarsFromSupabase } = await import('@/lib/cars');
        const allCars = await getCarsFromSupabase();
        console.log('MostSearchedCars: Geladene Autos:', allCars.length);
        
        // Sortiere nach Preis (teuerste zuerst) und nehme die 6 teuersten
        const sortedByPrice = [...allCars].sort((a, b) => b.pricePerDay - a.pricePerDay);
        const top6Expensive = sortedByPrice.slice(0, 6);
        
        console.log('MostSearchedCars: Top 6 teuerste Autos:', top6Expensive.map(c => `${c.name} - €${c.pricePerDay}`));
        setFeaturedCars(top6Expensive);
      } catch (error) {
        console.error('Fehler beim Laden der Autos:', error);
        // Fallback zu Mock-Daten bei Fehler
        const { cars: mockCars } = await import('@/data/cars');
        const sortedMock = [...mockCars].sort((a, b) => b.pricePerDay - a.pricePerDay);
        setFeaturedCars(sortedMock.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  const toggleFavorite = (carId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  return (
    <section className="relative overflow-hidden">
      {/* Blur Section with Title at the top */}
      <div className="relative h-40 md:h-56 overflow-hidden">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/ourcarsbackground.png)' }}
        >
          <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-b from-[#0A1929]/60 via-[#0A1929]/40 to-transparent" />
        </div>
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-2 px-4">
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">{t.ourCars.our}</span>{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(139,92,246,0.5)]">
                {t.ourCars.rentalCars}
              </span>
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] px-4">
              {t.ourCars.mostPopular}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area - Background Image */}
      <div className="relative py-12 sm:py-16 md:py-20 lg:py-32 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/ourcarsbackground.png)' }}>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Cars Grid */}
        {loading ? (
          <div className="text-center py-12 sm:py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-white"></div>
            <p className="mt-4 text-white text-sm sm:text-base">Lade Fahrzeuge...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {featuredCars.map((car, index) => {
            const isFavorite = favorites.includes(car.id);
            // Calculate fuel capacity (simplified)
            const fuelCapacity = car.fuel === 'Electric' ? '0L' : car.fuel === 'Hybrid' ? '60L' : '100L';
            
            return (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                {/* Car Card */}
                <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-200">
                  {/* Image Container */}
                  <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden bg-gray-100">
                    <Image
                      src={car.images[0] || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600'}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Favorite Button - Top Left */}
                    <button
                      onClick={(e) => toggleFavorite(car.id, e)}
                      className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-md"
                    >
                      <Heart
                        size={16}
                        className={`sm:w-5 sm:h-5 ${isFavorite ? 'text-cyan-500 fill-cyan-500' : 'text-gray-400'}`}
                      />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 sm:p-6 bg-white flex-1 flex flex-col">
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{car.brand}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{car.model}</p>
                    </div>
                    
                    {/* Price */}
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-bold text-gray-900">€{car.pricePerDay}.00</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">{t.ourCars.perDayLabel}</p>
                    </div>

                    {/* Feature Icons */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-cyan-100 rounded-xl border border-cyan-200 shadow-sm">
                        <Users size={18} className="sm:w-[22px] sm:h-[22px] text-cyan-600 mb-1 sm:mb-1.5" />
                        <span className="text-[10px] sm:text-xs font-bold text-gray-900">{car.seats} {t.ourCars.people}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-cyan-100 rounded-xl border border-cyan-200 shadow-sm">
                        <Settings size={18} className="sm:w-[22px] sm:h-[22px] text-cyan-600 mb-1 sm:mb-1.5" />
                        <span className="text-[10px] sm:text-xs font-bold text-gray-900">{car.transmission === 'Automatic' ? t.ourCars.auto : t.ourCars.manual}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-cyan-100 rounded-xl border border-cyan-200 shadow-sm">
                        <FuelIcon size={18} className="sm:w-[22px] sm:h-[22px] text-cyan-600 mb-1 sm:mb-1.5" />
                        <span className="text-[10px] sm:text-xs font-bold text-gray-900">{fuelCapacity}</span>
                      </div>
                    </div>

                    {/* Rent Now Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedCar(car);
                        setModalOpen(true);
                      }}
                      className="w-full mt-auto flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 bg-blue-500 text-white rounded-xl font-bold text-sm sm:text-base shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all"
                    >
                      <span>{t.ourCars.rentNow}</span>
                      <ArrowRight size={18} className="sm:w-5 sm:h-5" />
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

      {/* Rent Now Modal */}
      <RentNowModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCar(null);
        }}
        car={selectedCar}
      />
    </section>
  );
}
