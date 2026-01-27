'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { CarCategories } from './CarCategories';
import { Fuel, Gauge, Users, Settings } from 'lucide-react';
import { getFeaturedCars } from '@/data/cars';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BookingModal } from './BookingModal';
import Link from 'next/link';

export function CarSearchSection() {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const featuredCars = getFeaturedCars().slice(0, 6);
  const currentCar = featuredCars[currentCarIndex];

  const nextCar = () => {
    setCurrentCarIndex((prev) => (prev + 1) % featuredCars.length);
  };

  const prevCar = () => {
    setCurrentCarIndex((prev) => (prev - 1 + featuredCars.length) % featuredCars.length);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-2">
            <CarCategories />
          </div>

          {/* Main Car Display */}
          <div className="lg:col-span-7">
            <div className="glass rounded-3xl overflow-hidden border border-white/10">
              {/* Carousel Navigation */}
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <button
                  onClick={prevCar}
                  className="p-2 glass rounded-lg hover:bg-white/10 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <span className="text-white/60 font-medium">
                  {String(currentCarIndex + 1).padStart(2, '0')} / {String(featuredCars.length).padStart(2, '0')}
                </span>
                <button
                  onClick={nextCar}
                  className="p-2 glass rounded-lg hover:bg-white/10 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Car Image */}
              <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-dark/50 to-dark">
                <Image
                  src={currentCar.images[0] || 'https://via.placeholder.com/800x600'}
                  alt={currentCar.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
              </div>

              {/* Car Info */}
              <div className="p-8">
                <div className="mb-6">
                  <p className="text-accent text-sm font-semibold mb-2">BRAND NAME</p>
                  <h1 className="text-4xl md:text-5xl font-black mb-4">{currentCar.name}</h1>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 glass rounded-lg">
                    <Fuel className="text-accent mb-2" size={24} />
                    <span className="text-xs text-white/60 mb-1">Fuel</span>
                    <span className="text-sm font-semibold">{currentCar.fuel}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 glass rounded-lg">
                    <Gauge className="text-accent mb-2" size={24} />
                    <span className="text-xs text-white/60 mb-1">Mileage</span>
                    <span className="text-sm font-semibold">5000 km</span>
                  </div>
                  <div className="flex flex-col items-center p-4 glass rounded-lg">
                    <Users className="text-accent mb-2" size={24} />
                    <span className="text-xs text-white/60 mb-1">Seats</span>
                    <span className="text-sm font-semibold">{currentCar.seats}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 glass rounded-lg">
                    <Settings className="text-accent mb-2" size={24} />
                    <span className="text-xs text-white/60 mb-1">Transmission</span>
                    <span className="text-sm font-semibold">{currentCar.transmission}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setBookingModalOpen(true)}
                    className="flex-1 px-6 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/30"
                  >
                    RENT THIS CAR
                  </motion.button>
                  <Link
                    href={`/fleet/${currentCar.slug}`}
                    className="flex-1 px-6 py-4 glass border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-center"
                  >
                    VIEW FULL DETAILS
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Featured Cars Thumbnails */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold mb-4">Featured Cars</h3>
            <div className="space-y-4">
              {featuredCars.map((car, index) => (
                <motion.button
                  key={car.id}
                  onClick={() => setCurrentCarIndex(index)}
                  className={`w-full glass rounded-xl overflow-hidden border transition-all ${
                    index === currentCarIndex
                      ? 'border-accent scale-105'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="relative h-24">
                    <Image
                      src={car.images[0] || 'https://via.placeholder.com/300x200'}
                      alt={car.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-white/60 mb-1">BRAND NAME</p>
                    <p className="text-sm font-semibold">{car.name}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        carName={currentCar.name}
      />
    </section>
  );
}

