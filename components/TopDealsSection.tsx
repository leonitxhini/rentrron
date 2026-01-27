'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Fuel, Settings, ArrowRight } from 'lucide-react';
import { cars } from '@/data/cars';

export function TopDealsSection() {
  const brands = ['Honda', 'BMW', 'Audi', 'Ford', 'Tesla', 'More 20+'];
  const featuredCars = cars.slice(0, 4);

  const getFuelIcon = (fuel: string) => {
    if (fuel.toLowerCase().includes('electric')) return '⚡';
    return '⛽';
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-black text-black mb-4">Explore Our Top Deals</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Get exclusive offers on high-end residences and coveted cars! Our incredible deals will help you save a tonne of money and improve your lifestyle.
          </p>

          {/* Brand Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {brands.map((brand, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-br from-gray-100 to-gray-50 hover:from-accent hover:to-purple-500 rounded-xl font-bold text-gray-700 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl border-2 border-transparent hover:border-accent/50"
              >
                {brand}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group card-3d relative"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 via-purple-500/0 to-pink-500/0 group-hover:from-accent/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300 -z-10 blur-xl" />
              
              <div className="relative w-full h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10" />
                <Image
                  src={car.images[0] || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600'}
                  alt={car.name}
                  fill
                  className="object-cover group-hover:scale-125 transition-transform duration-700"
                />
                {/* Price Badge with Glow */}
                <div className="absolute top-4 right-4 z-20 glass-card px-4 py-2 rounded-full pulse-glow">
                  <span className="text-white font-black text-base">€{car.pricePerDay}/day</span>
                </div>
              </div>
              
              <div className="p-6 relative z-10 bg-white">
                <h3 className="text-xl font-black text-black mb-2 group-hover:gradient-text transition-all">
                  {car.name}
                </h3>
                
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full group-hover:from-accent/10 group-hover:to-purple-500/10 transition-all">
                    <Users size={16} className="text-accent" />
                    <span className="font-semibold">{car.seats}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full group-hover:from-accent/10 group-hover:to-purple-500/10 transition-all">
                    <span className="text-lg">{getFuelIcon(car.fuel)}</span>
                    <span className="font-semibold">{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full group-hover:from-accent/10 group-hover:to-purple-500/10 transition-all">
                    <Settings size={16} className="text-accent" />
                    <span className="font-semibold">{car.transmission}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-accent/5 to-purple-500/5 rounded-xl border border-accent/20">
                  <span className="text-3xl font-black gradient-text">€{car.pricePerDay}</span>
                  <span className="text-gray-500 font-semibold">/ Day</span>
                </div>

                <Link href={`/fleet/${car.slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 button-shine text-white rounded-xl font-black shadow-lg hover:shadow-2xl transition-all relative overflow-hidden text-base"
                  >
                    <span className="relative z-10">Show More</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

