'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CreateMomentsSection() {
  return (
    <section className="bg-white py-32">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black text-black leading-tight mb-8">
            WE CREATE MORE THAN
            <br />
            RENTALS – WE
            <br />
            CRAFT
            <br />
            <span className="text-gray-500">MOMENTS OF</span>
            <br />
            <span className="text-gray-500">FREEDOM</span>
            <br />
            <span className="text-gray-500">STYLE AND</span>
            <br />
            UNDENIABLE
            <br />
            PRESENCE
          </h2>
        </motion.div>

        {/* Explore The Lineup Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Categories */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-5xl md:text-6xl font-black text-black mb-12 leading-tight">
              EXPLORE THE
              <br />
              LINEUP
            </h3>

            <div className="space-y-8">
              {/* Economy */}
              <div className="text-gray-500">
                <p className="text-2xl font-bold uppercase">ECONOMY</p>
              </div>

              {/* Electric - Featured */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-2xl font-black text-black uppercase mb-2">ELECTRIC</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      PERFECT FOR CITY RIDES — COMPACT, FUEL-EFFICIENT, AND EASY TO HANDLE
                    </p>
                  </div>
                  <Link href="/fleet?category=electric">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-32 h-32 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all flex-shrink-0"
                    >
                      <div className="text-center">
                        <p className="text-xs font-bold mb-1">LEARN</p>
                        <p className="text-xs font-bold mb-1">MORE</p>
                        <ArrowRight size={16} className="mx-auto" />
                      </div>
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* SUV */}
              <div className="text-gray-500">
                <p className="text-2xl font-bold uppercase">SUV</p>
              </div>

              {/* Premium */}
              <div className="text-gray-500">
                <p className="text-2xl font-bold uppercase">PREMIUM</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Car Image and Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-600 text-sm leading-relaxed">
              SELECT THE PERFECT CAR CATEGORY TO MATCH YOUR JOURNEY — WHETHER IT'S EFFICIENT CITY DRIVING, RUGGED ADVENTURES, OR LUXURY ON WHEELS
            </p>
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200"
                alt="Premium Electric Car"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

