'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cars } from '@/data/cars';

export function PricingSection() {
  const featuredCar = cars.find(car => car.featured) || cars[0];

  return (
    <section className="bg-white py-32">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black text-black mb-16"
        >
          PRICING
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Car Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full h-[600px] rounded-lg overflow-hidden"
          >
            <Image
              src={featuredCar.images[0] || 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200'}
              alt={featuredCar.name}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right - Car Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-black text-black uppercase">
              {featuredCar.name.toUpperCase()}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Timeless performance meets modern precision. With all-wheel drive, turbocharged power, and unmistakable design.
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-6 py-6 border-t border-b border-gray-200">
              <div>
                <p className="text-gray-600 text-sm mb-1">Doors:</p>
                <p className="text-black font-bold">2</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Seats:</p>
                <p className="text-black font-bold">{featuredCar.seats}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Drive:</p>
                <p className="text-black font-bold">AWD</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Fuel:</p>
                <p className="text-black font-bold">{featuredCar.fuel}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Trans.:</p>
                <p className="text-black font-bold">{featuredCar.transmission}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Max:</p>
                <p className="text-black font-bold">306 km/h</p>
              </div>
            </div>

            {/* Price */}
            <div className="py-6">
              <p className="text-4xl md:text-5xl font-black text-black">
                FROM €{featuredCar.pricePerDay}/DAY
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <Link href={`/fleet/${featuredCar.slug}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 border-2 border-black text-black font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
                >
                  VIEW FULL DETAILS
                </motion.button>
              </Link>
              <Link href="/booking">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-800 transition-all"
                >
                  REQUEST AVAILABILITY
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

