'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { CarCard } from './CarCard';
import { getFeaturedCars } from '@/data/cars';
import { useState } from 'react';
import { BookingModal } from './BookingModal';

export function FeaturedFleet() {
  const { t } = useLanguage();
  const featuredCars = getFeaturedCars();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string>('');

  const handleQuickBook = (carName: string) => {
    setSelectedCar(carName);
    setBookingModalOpen(true);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6" style={{ letterSpacing: '-0.02em' }}>
            {t.fleet.featured}
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Discover our premium selection of luxury vehicles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CarCard
                car={car}
                onQuickBook={() => handleQuickBook(car.name)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setSelectedCar('');
        }}
        carName={selectedCar}
      />
    </section>
  );
}

