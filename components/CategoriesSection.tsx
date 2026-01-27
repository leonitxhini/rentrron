'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CategoriesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      name: 'Compact',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600',
      description: 'Perfect for city driving',
      gradient: 'from-blue-500 to-cyan-500',
      icon: '🚗',
    },
    {
      name: 'Sedan',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600',
      description: 'Comfortable and spacious',
      gradient: 'from-purple-500 to-pink-500',
      icon: '🚙',
    },
    {
      name: 'SUV',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600',
      description: 'Ideal for families',
      gradient: 'from-pink-500 to-red-500',
      icon: '🚐',
    },
    {
      name: 'Pickup Truck',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600',
      description: 'Powerful and versatile',
      gradient: 'from-orange-500 to-yellow-500',
      icon: '🚛',
    },
    {
      name: 'Luxury',
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600',
      description: 'Premium experience',
      gradient: 'from-indigo-500 to-purple-500',
      icon: '✨',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-32 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-br from-accent/5 to-purple-500/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
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
              <span className="gradient-text">Categories</span>
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent via-purple-500 to-pink-500 blur-3xl opacity-30"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
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
            Explore our range of compact cars, luxury sedans, rugged SUVs, & reliable trucks to find your ideal vehicle today.
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const mouseX = useMotionValue(0);
            const mouseY = useMotionValue(0);
            
            const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
            const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
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
                whileHover={{ y: -12, scale: 1.03 }}
                className="relative group cursor-pointer"
              >
                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-2 bg-gradient-to-r ${category.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                  animate={{
                    opacity: hoveredIndex === index ? 0.6 : 0,
                  }}
                />

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 group-hover:border-transparent">
                  {/* Image Container */}
                  <div className="relative w-full h-56 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 group-hover:from-black/40 transition-all duration-500`} />
                    
                    {/* Animated Gradient Overlay on Hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 z-5 transition-opacity duration-500`}
                    />

                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-125 transition-transform duration-700"
                    />

                    {/* Icon Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center shadow-2xl z-20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                    >
                      <span className="text-2xl">{category.icon}</span>
                    </motion.div>

                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 z-15"
                      animate={{
                        x: hoveredIndex === index ? ['-200%', '200%'] : '-200%',
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: hoveredIndex === index ? Infinity : 0,
                        repeatDelay: 1,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-white relative">
                    {/* Animated Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      <h3 className="text-xl font-black text-black mb-2 group-hover:gradient-text transition-all duration-300">
                        {category.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 group-hover:text-gray-700 transition-colors">
                        {category.description}
                      </p>

                      {/* Animated Accent Line */}
                      <motion.div
                        className={`h-1 bg-gradient-to-r ${category.gradient} rounded-full`}
                        initial={{ width: '0%' }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      />

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.7 }}
                        className="mt-4"
                      >
                        <Link href={`/fleet?category=${category.name.toLowerCase()}`}>
                          <motion.button
                            whileHover={{ scale: 1.05, x: 4 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r ${category.gradient} text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all group/btn relative overflow-hidden`}
                          >
                            <span className="relative z-10">Explore</span>
                            <ArrowRight 
                              size={16} 
                              className="relative z-10 group-hover/btn:translate-x-1 transition-transform" 
                            />
                            {/* Shine Effect on Button */}
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
                      </motion.div>
                    </div>
                  </div>

                  {/* Floating Particles on Hover */}
                  {hoveredIndex === index && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-2 h-2 bg-gradient-to-r ${category.gradient} rounded-full`}
                          initial={{
                            x: '50%',
                            y: '50%',
                            scale: 0,
                            opacity: 1,
                          }}
                          animate={{
                            x: `${50 + (Math.random() - 0.5) * 200}%`,
                            y: `${50 + (Math.random() - 0.5) * 200}%`,
                            scale: [0, 1, 0],
                            opacity: [1, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
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
