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
    <section className="bg-gradient-to-b from-[#0A1929] via-[#0A1929] to-[#0A1929] py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 bg-gradient-to-br from-accent/5 to-purple-500/5 rounded-full blur-3xl"
            animate={{
              x: [0, 150, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              delay: Math.random() * 8,
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
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 relative">
              <span>{t.bestService.title.split(' ')[0]}</span>
              <br />
              <span className="text-accent">{t.bestService.title.split(' ')[1]}</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {t.bestService.subtitle}
          </motion.p>
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
                {/* Outer Glow */}
                <motion.div
                  className="absolute -inset-2 bg-accent rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                />

                {/* Main Card */}
                <div className="relative bg-[#0A1929]/50 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/10 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:border-white/30 h-full flex flex-col">
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    {/* Icon Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${service.gradient} blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                      animate={{
                        opacity: hoveredIndex === index ? 0.4 : 0,
                        scale: hoveredIndex === index ? 1.2 : 1,
                      }}
                    />

                    {/* Icon Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                      className="relative w-16 h-16 bg-accent rounded-xl flex items-center justify-center shadow-lg z-10"
                    >
                      <Icon size={32} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-200">
                        {service.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed flex-1 group-hover:text-white/90 transition-colors">
                      {service.description}
                    </p>

                    {/* Animated Accent Line */}
                    <motion.div
                      className={`h-1.5 bg-gradient-to-r ${service.gradient} rounded-full mt-6`}
                      initial={{ width: '0%' }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    />

                    {/* Floating Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                      className="mt-6"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${service.gradient} text-white rounded-full text-sm font-bold shadow-lg`}
                      >
                        <span>{t.bestService.learnMore}</span>
                        <motion.div
                          animate={{
                            x: [0, 4, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        >
                          →
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>


                  {/* Corner Accent */}
                  <motion.div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-bl-full`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
