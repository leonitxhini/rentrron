'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { MapPin, Shield, Phone, Wrench, DollarSign, Plane } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export function CustomerExperienceSection() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: MapPin,
      text: t.customerExperience.feature1,
      position: 'left',
      top: '10%',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      text: t.customerExperience.feature2,
      position: 'left',
      top: '40%',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Phone,
      text: t.customerExperience.feature3,
      position: 'left',
      top: '70%',
      gradient: 'from-pink-500 to-red-500',
    },
    {
      icon: Wrench,
      text: t.customerExperience.feature4,
      position: 'right',
      top: '10%',
      gradient: 'from-orange-500 to-yellow-500',
    },
    {
      icon: DollarSign,
      text: t.customerExperience.feature5,
      position: 'right',
      top: '40%',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Plane,
      text: t.customerExperience.feature6,
      position: 'right',
      top: '70%',
      gradient: 'from-green-500 to-emerald-500',
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
            <span>{t.customerExperience.title.split(' ')[0]} {t.customerExperience.title.split(' ')[1]}</span>{' '}
            <span className="gradient-text">{t.customerExperience.title.split(' ')[2]}</span>
          </h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto">
            {t.customerExperience.subtitle}
          </p>
        </motion.div>

        {/* Desktop Layout - Features around car */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto hidden lg:block">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full h-[400px] flex items-center justify-center mb-8"
          >
            <div className="relative w-full h-full">
              <Image
                src="/hero/hero-image.png"
                alt="RRON Rent A Car"
                fill
                className="object-contain relative z-10 drop-shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800';
                }}
              />
            </div>
          </motion.div>

          {/* Features */}
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const mouseX = useMotionValue(0);
            const mouseY = useMotionValue(0);
            
            const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
            const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: feature.position === 'left' ? -100 : 100, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
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
                style={{ top: feature.top, rotateX, rotateY, transformStyle: 'preserve-3d' }}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`absolute ${feature.position === 'left' ? 'left-0' : 'right-0'} z-20 group`}
              >
                <div className="flex items-center gap-4 cursor-pointer relative">
                  {feature.position === 'left' && (
                    <>
                      {/* Icon Container */}
                      <div className="relative w-14 h-14 bg-accent rounded-lg flex items-center justify-center z-10">
                        <Icon size={24} className="text-white relative z-10" />
                      </div>

                      {/* Text Container */}
                      <div className="relative bg-white/5 rounded-lg px-4 py-3 border border-white/10 group-hover:border-white/20 transition-all">
                        <p className="text-white font-semibold text-sm max-w-[200px]">
                          {feature.text}
                        </p>
                      </div>

                      {/* Simple Line */}
                      <div className="h-1 bg-accent rounded-full w-16" />
                    </>
                  )}
                  {feature.position === 'right' && (
                    <>
                      {/* Simple Line */}
                      <div className="h-1 bg-accent rounded-full w-16" />

                      {/* Text Container */}
                      <div className="relative bg-white/5 rounded-lg px-4 py-3 border border-white/10 group-hover:border-white/20 transition-all">
                        <p className="text-white font-semibold text-sm max-w-[200px] text-right">
                          {feature.text}
                        </p>
                      </div>

                      {/* Icon Container */}
                      <div className="relative w-14 h-14 bg-accent rounded-lg flex items-center justify-center z-10">
                        <Icon size={24} className="text-white relative z-10" />
                      </div>
                    </>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Layout - Car on top, features grid below */}
        <div className="lg:hidden space-y-8">
          {/* Car Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full h-[300px] sm:h-[400px] flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <Image
                src="/hero/hero-image.png"
                alt="RRON Rent A Car"
                fill
                className="object-contain relative z-10 drop-shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800';
                }}
              />
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={28} className="text-white" />
                    </div>
                    {/* Text */}
                    <p className="text-white font-bold text-sm sm:text-base">
                      {feature.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
