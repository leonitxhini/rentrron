'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Settings, Users, Zap, Gauge } from 'lucide-react';
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

  const getFuelIcon = (fuel: string) => {
    if (fuel.toLowerCase().includes('electric')) return <Zap size={16} />;
    return <Zap size={16} />;
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <Image
          src={car.images[0] || 'https://via.placeholder.com/800x600'}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">€{car.pricePerDay}</span>
              <span className="text-xs font-medium text-gray-600">{t.fleet.perDay}</span>
            </div>
          </div>
        </div>

        {/* Featured Badge */}
        {car.featured && (
          <div className="absolute top-4 left-4">
            <div className="bg-accent px-3 py-1.5 rounded-lg shadow-lg">
              <span className="text-xs font-semibold text-white">Featured</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 bg-white/5 backdrop-blur-sm">
        {/* Car Name */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-1">{car.name}</h3>
          <p className="text-sm text-white/60">{car.brand} • {car.model}</p>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
            <Settings size={18} className="text-accent flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-white/60">{t.carDetails.transmission}</span>
              <span className="text-sm font-semibold text-white">{car.transmission}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
            <div className="text-accent flex-shrink-0">
              {getFuelIcon(car.fuel)}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-white/60">{t.carDetails.fuel}</span>
              <span className="text-sm font-semibold text-white">{car.fuel}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
            <Users size={18} className="text-accent flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-white/60">{t.carDetails.seats}</span>
              <span className="text-sm font-semibold text-white">{car.seats}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
            <Gauge size={18} className="text-accent flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-white/60">Power</span>
              <span className="text-sm font-semibold text-white">{car.horsepower} HP</span>
            </div>
          </div>
        </div>

        {/* Location Tags */}
        {car.locationAvailability.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {car.locationAvailability.slice(0, 2).map((location, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium border border-accent/20"
              >
                {location}
              </span>
            ))}
            {car.locationAvailability.length > 2 && (
              <span className="px-2.5 py-1 bg-white/5 text-white/70 rounded-md text-xs font-medium border border-white/10">
                +{car.locationAvailability.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/fleet/${car.slug}`}
            className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-center text-sm font-semibold text-white transition-all duration-200 hover:border-white/30"
          >
            {t.fleet.viewDetails}
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleQuickBook}
            className="px-6 py-3 bg-gradient-to-r from-accent to-accent-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all duration-200 text-sm"
          >
            {t.fleet.quickBook}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

