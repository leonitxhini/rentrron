'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { MapPin, Shield, Phone, Wrench, DollarSign, Plane, Sparkles } from 'lucide-react';
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
    <section className="bg-gradient-to-b from-[#0A1929] via-[#0A1929] to-[#0A1929] py-32 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 relative">
              <span>{t.customerExperience.title.split(' ')[0]} {t.customerExperience.title.split(' ')[1]}</span>
              <br />
              <span className="gradient-text">{t.customerExperience.title.split(' ')[2]}</span>
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
            className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {t.customerExperience.subtitle}
          </motion.p>
        </motion.div>

        {/* Desktop Layout - Features around car */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto hidden lg:block">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full h-[600px] flex items-center justify-center mb-12"
          >
            <div className="relative w-full h-full">
              {/* Glow behind image */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent via-purple-500 to-pink-500 blur-3xl opacity-20"
                animate={{
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
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
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        className={`relative w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-2xl z-10`}
                      >
                        <Icon size={36} className="text-white relative z-10" />
                        
                        {/* Rotating Sparkles */}
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Sparkles
                            size={16}
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50"
                          />
                          <Sparkles
                            size={14}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-white/50"
                          />
                          <Sparkles
                            size={12}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white/50"
                          />
                          <Sparkles
                            size={15}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-white/50"
                          />
                        </motion.div>

                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 rounded-2xl"
                          animate={{
                            x: hoveredIndex === index ? ['-200%', '200%'] : '-200%',
                          }}
                          transition={{
                            duration: 1,
                            repeat: hoveredIndex === index ? Infinity : 0,
                            repeatDelay: 1.5,
                          }}
                        />

                        {/* Glow Effect */}
                        <motion.div
                          className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                          animate={{
                            opacity: hoveredIndex === index ? 0.6 : 0,
                          }}
                        />
                      </motion.div>

                      {/* Text Container */}
                      <div className="relative glass-card rounded-xl px-6 py-4 border border-white/10 group-hover:border-white/30 transition-all">
                        <p className="text-white font-bold text-base max-w-[240px] group-hover:gradient-text transition-all duration-300">
                          {feature.text}
                        </p>
                      </div>

                      {/* Animated Line */}
                      <motion.div
                        className={`h-1.5 bg-gradient-to-r ${feature.gradient} rounded-full`}
                        initial={{ width: '0px' }}
                        whileInView={{ width: '80px' }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                        whileHover={{ width: '120px' }}
                      />
                    </>
                  )}
                  {feature.position === 'right' && (
                    <>
                      {/* Animated Line */}
                      <motion.div
                        className={`h-1.5 bg-gradient-to-l ${feature.gradient} rounded-full`}
                        initial={{ width: '0px' }}
                        whileInView={{ width: '80px' }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                        whileHover={{ width: '120px' }}
                      />

                      {/* Text Container */}
                      <div className="relative glass-card rounded-xl px-6 py-4 border border-white/10 group-hover:border-white/30 transition-all">
                        <p className="text-white font-bold text-base max-w-[240px] text-right group-hover:gradient-text transition-all duration-300">
                          {feature.text}
                        </p>
                      </div>

                      {/* Icon Container */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        className={`relative w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-2xl z-10`}
                      >
                        <Icon size={36} className="text-white relative z-10" />
                        
                        {/* Rotating Sparkles */}
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Sparkles
                            size={16}
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50"
                          />
                          <Sparkles
                            size={14}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-white/50"
                          />
                          <Sparkles
                            size={12}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white/50"
                          />
                          <Sparkles
                            size={15}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-white/50"
                          />
                        </motion.div>

                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 rounded-2xl"
                          animate={{
                            x: hoveredIndex === index ? ['-200%', '200%'] : '-200%',
                          }}
                          transition={{
                            duration: 1,
                            repeat: hoveredIndex === index ? Infinity : 0,
                            repeatDelay: 1.5,
                          }}
                        />

                        {/* Glow Effect */}
                        <motion.div
                          className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                          animate={{
                            opacity: hoveredIndex === index ? 0.6 : 0,
                          }}
                        />
                      </motion.div>
                    </>
                  )}

                  {/* Floating Particles on Hover */}
                  {hoveredIndex === index && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full`}
                          initial={{
                            x: '50%',
                            y: '50%',
                            scale: 0,
                            opacity: 1,
                          }}
                          animate={{
                            x: `${50 + (Math.random() - 0.5) * 200}%`,
                            y: `${50 + (Math.random() - 0.5) * 200}%`,
                            scale: [0, 1.5, 0],
                            opacity: [1, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
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
              {/* Glow behind image */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent via-purple-500 to-pink-500 blur-3xl opacity-20"
                animate={{
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
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
                  className="glass-card rounded-2xl p-4 sm:p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
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
