'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Fuel, Settings, ArrowRight, Star, Sparkles } from 'lucide-react';
import { cars } from '@/data/cars';
import { useLanguage } from './LanguageProvider';

export function MostSearchedCars() {
  const { t } = useLanguage();
  const featuredCars = cars.slice(0, 4);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getFuelIcon = (fuel: string) => {
    if (fuel.toLowerCase().includes('electric')) return '⚡';
    return '⛽';
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-black mb-4 relative">
              <span>{t.ourCars.title.split(' ')[0]}</span>
              <br />
              <span className="gradient-text">{t.ourCars.title.split(' ')[1]}</span>
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent via-purple-500 to-pink-500 blur-3xl opacity-20"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {t.ourCars.subtitle}
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCars.map((car, index) => {
            const mouseX = useMotionValue(0);
            const mouseY = useMotionValue(0);
            
            const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
            const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

            return (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onMouseMove={(e) => {
                  if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    mouseX.set((e.clientX - centerX) / 1000);
                    mouseY.set((e.clientY - centerY) / 1000);
                  }
                }}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="relative group"
              >
                {/* Outer Glow */}
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-r from-accent via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  animate={{
                    opacity: hoveredIndex === index ? 0.4 : 0,
                  }}
                />

                {/* Main Card */}
                <div className="relative bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:border-accent/30">
                  {/* Image Container */}
                  <div className="relative w-full h-64 overflow-hidden">
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10 group-hover:from-black/30 transition-all duration-500" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent/0 to-purple-500/0 group-hover:from-accent/20 group-hover:to-purple-500/20 z-5 transition-all duration-500"
                    />

                    <Image
                      src={car.images[0] || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600'}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-150 transition-transform duration-1000"
                    />

                    {/* Price Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                      className="absolute top-4 right-4 glass-card px-4 py-2 rounded-full z-20 group-hover:scale-110 transition-all pulse-glow"
                    >
                      <span className="text-white font-black text-base">€{car.pricePerDay}{t.ourCars.perDay}</span>
                    </motion.div>

                    {/* Popular Badge */}
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                      className="absolute top-4 left-4 z-20"
                    >
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                        <Star size={14} className="text-white fill-white" />
                        <span className="text-white text-xs font-bold">Popular</span>
                      </div>
                    </motion.div>

                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 z-15"
                      animate={{
                        x: hoveredIndex === index ? ['-200%', '200%'] : '-200%',
                      }}
                      transition={{
                        duration: 1,
                        repeat: hoveredIndex === index ? Infinity : 0,
                        repeatDelay: 1.5,
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 bg-white relative overflow-hidden">
                    {/* Animated Background Gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent/0 to-purple-500/0 group-hover:from-accent/5 group-hover:to-purple-500/5 transition-all duration-500"
                    />

                    <div className="relative z-10">
                      <h3 className="text-2xl font-black text-black mb-3 group-hover:gradient-text transition-all duration-300">
                        {car.name}
                      </h3>
                      
                      {/* Specs with Icons */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <motion.div
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full group-hover:from-accent/10 group-hover:to-purple-500/10 transition-all"
                        >
                          <Users size={16} className="text-accent" />
                          <span className="text-sm font-bold text-gray-700">{car.seats}</span>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full group-hover:from-accent/10 group-hover:to-purple-500/10 transition-all"
                        >
                          <span className="text-lg">{getFuelIcon(car.fuel)}</span>
                          <span className="text-sm font-bold text-gray-700">{car.fuel}</span>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full group-hover:from-accent/10 group-hover:to-purple-500/10 transition-all"
                        >
                          <Settings size={16} className="text-accent" />
                          <span className="text-sm font-bold text-gray-700">{car.transmission}</span>
                        </motion.div>
                      </div>

                      {/* Price Display */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-accent/10 to-purple-500/10 rounded-xl border border-accent/20 group-hover:from-accent/20 group-hover:to-purple-500/20 transition-all">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black gradient-text">€{car.pricePerDay}</span>
                          <span className="text-gray-500 font-semibold">{t.ourCars.perDay}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link href={`/fleet/${car.slug}`}>
                        <motion.button
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-accent via-purple-500 to-pink-500 text-white rounded-xl font-black text-base shadow-xl hover:shadow-2xl transition-all group/btn relative overflow-hidden"
                        >
                          <span className="relative z-10">{t.ourCars.showMore}</span>
                          <ArrowRight 
                            size={18} 
                            className="relative z-10 group-hover/btn:translate-x-2 transition-transform" 
                          />
                          {/* Animated Shine */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                            }}
                          />
                        </motion.button>
                      </Link>
                    </div>
                  </div>

                  {/* Floating Sparkles on Hover */}
                  {hoveredIndex === index && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 bg-accent rounded-full"
                          initial={{
                            x: '50%',
                            y: '50%',
                            scale: 0,
                            opacity: 1,
                          }}
                          animate={{
                            x: `${50 + (Math.random() - 0.5) * 300}%`,
                            y: `${50 + (Math.random() - 0.5) * 300}%`,
                            scale: [0, 1.5, 0],
                            opacity: [1, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.25,
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
