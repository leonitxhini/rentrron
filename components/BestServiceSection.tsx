'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Shield, Clock, MapPin, Zap, Award, Star } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export function BestServiceSection() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Shield,
      title: t.bestService.support.title,
      description: t.bestService.support.description,
      gradient: 'from-blue-500 to-cyan-500',
      color: 'blue',
    },
    {
      icon: Clock,
      title: t.bestService.fastBooking.title,
      description: t.bestService.fastBooking.description,
      gradient: 'from-purple-500 to-pink-500',
      color: 'purple',
    },
    {
      icon: MapPin,
      title: t.bestService.locations.title,
      description: t.bestService.locations.description,
      gradient: 'from-pink-500 to-red-500',
      color: 'pink',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#0A1929] via-[#0A1929] to-[#0A1929] py-12 sm:py-16 relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
            <span>{t.bestService.title.split(' ')[0]}</span>{' '}
            <span className="text-accent">{t.bestService.title.split(' ')[1]}</span>
          </h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto">
            {t.bestService.subtitle}
          </p>
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const mouseX = useMotionValue(0);
            const mouseY = useMotionValue(0);
            
            const rotateX = useTransform(mouseY, [-0.5, 0.5], [2, -2]);
            const rotateY = useTransform(mouseX, [-0.5, 0.5], [-2, 2]);

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
                whileHover={{ y: -5, scale: 1.01 }}
                className="relative group cursor-pointer"
              >

                {/* Main Card */}
                <div className="relative bg-[#0A1929]/50 backdrop-blur-xl rounded-xl p-5 border border-white/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-white/20 h-full flex flex-col">
                  {/* Icon Container */}
                  <div className="relative mb-4">

                    {/* Icon Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                      className="relative w-12 h-12 bg-accent rounded-lg flex items-center justify-center z-10"
                    >
                      <Icon size={24} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
