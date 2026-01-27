'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { Car } from '@/data/cars';
import { generateWhatsAppMessage } from '@/lib/whatsapp';

interface CarCardProps {
  car: Car;
  onQuickBook?: () => void;
}

export function CarCard({ car, onQuickBook }: CarCardProps) {
  const { t, language } = useLanguage();

  const handleQuickBook = () => {
    if (onQuickBook) {
      onQuickBook();
    } else {
      const message = generateWhatsAppMessage({
        car: car.name,
        fromDate: 'TBD',
        toDate: 'TBD',
        location: car.locationAvailability[0],
        lang: language,
      });
      window.open(message, '_blank');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.01 }}
      className="group relative glass rounded-3xl overflow-hidden border border-white/5"
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={car.images[0] || 'https://via.placeholder.com/800x600'}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/50 to-transparent" />
        <div className="absolute top-6 right-6">
          <span className="px-4 py-2 glass-strong rounded-lg text-base font-bold backdrop-blur-xl">
            €{car.pricePerDay}
            <span className="text-sm font-normal opacity-70">{t.fleet.perDay}</span>
          </span>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-3xl font-black mb-4">{car.name}</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
            {car.transmission}
          </span>
          <span className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
            {car.fuel}
          </span>
          <span className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
            {car.seats} {t.carDetails.seats}
          </span>
          <span className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
            {car.horsepower} HP
          </span>
        </div>

        <div className="flex gap-4">
          <Link
            href={`/fleet/${car.slug}`}
            className="flex-1 px-6 py-3 glass border border-white/10 rounded-lg text-center hover:bg-white/5 transition-all font-medium"
          >
            {t.fleet.viewDetails}
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickBook}
            className="px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/30"
          >
            {t.fleet.quickBook}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

