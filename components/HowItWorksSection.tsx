'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Calendar, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export function HowItWorksSection() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      icon: MapPin,
      title: t.howItWorks.step1.title,
      description: t.howItWorks.step1.description,
      gradient: 'from-blue-500 to-cyan-500',
      number: '01',
    },
    {
      icon: Calendar,
      title: t.howItWorks.step2.title,
      description: t.howItWorks.step2.description,
      gradient: 'from-purple-500 to-pink-500',
      number: '02',
    },
    {
      icon: Check,
      title: t.howItWorks.step3.title,
      description: t.howItWorks.step3.description,
      gradient: 'from-pink-500 to-red-500',
      number: '03',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#0A1929] via-[#0A1929] to-[#0A1929] py-32 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 relative">
              <span>{t.howItWorks.title.split(' ')[0]} {t.howItWorks.title.split(' ')[1]}</span>
              <br />
              <span className="gradient-text">{t.howItWorks.title.split(' ')[2]}</span>
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
            {t.howItWorks.subtitle}
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 max-w-6xl mx-auto relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const mouseX = useMotionValue(0);
            const mouseY = useMotionValue(0);
            
            const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
            const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

            return (
              <div key={index} className="flex-1 flex flex-col items-center relative w-full">
                {/* Connecting Arrow (Desktop only) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
                    className="hidden md:block absolute top-24 left-[60%] w-[80%] h-0.5 z-0"
                  >
                    <div className={`h-full bg-gradient-to-r ${step.gradient} via-purple-500 to-${steps[index + 1].gradient.split(' ')[1]} rounded-full relative overflow-hidden`}>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                    </div>
                    <motion.div
                      animate={{
                        x: ['0%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute top-1/2 -translate-y-1/2 right-0"
                    >
                      <ArrowRight size={20} className={`text-${step.gradient.split(' ')[1]}`} />
                    </motion.div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
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
                  whileHover={{ y: -12, scale: 1.05 }}
                  className="relative group cursor-pointer w-full"
                >
                  {/* Outer Glow */}
                  <motion.div
                    className={`absolute -inset-3 bg-gradient-to-r ${step.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                    animate={{
                      opacity: hoveredIndex === index ? 0.5 : 0,
                    }}
                  />

                  {/* Main Card */}
                  <div className="relative bg-[#0A1929]/50 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/10 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:border-white/30 h-full flex flex-col items-center text-center">
                    {/* Animated Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    {/* Step Number Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                      className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center shadow-2xl z-20 group-hover:scale-110 group-hover:rotate-12 transition-all`}
                    >
                      <span className="text-white font-black text-lg">{step.number}</span>
                    </motion.div>

                    {/* Icon Container */}
                    <div className="relative mb-6 mt-4">
                      {/* Icon Glow */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${step.gradient} blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                        animate={{
                          opacity: hoveredIndex === index ? 0.4 : 0,
                          scale: hoveredIndex === index ? 1.2 : 1,
                        }}
                      />

                      {/* Icon Circle */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.4, type: "spring" }}
                        whileHover={{ scale: 1.15, rotate: 360 }}
                        className={`relative w-24 h-24 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-2xl z-10`}
                      >
                        <Icon size={48} className="text-white" />
                        
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
                            size={20}
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50"
                          />
                          <Sparkles
                            size={18}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-white/50"
                          />
                          <Sparkles
                            size={16}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white/50"
                          />
                          <Sparkles
                            size={19}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-white/50"
                          />
                        </motion.div>
                      </motion.div>

                      {/* Shine Effect on Icon */}
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
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="text-2xl font-black text-white mb-3 group-hover:gradient-text transition-all duration-300">
                        {step.title}
                      </h3>
                      <p className="text-white/70 text-base leading-relaxed group-hover:text-white/90 transition-colors">
                        {step.description}
                      </p>

                      {/* Animated Accent Line */}
                      <motion.div
                        className={`h-1.5 bg-gradient-to-r ${step.gradient} rounded-full mt-6`}
                        initial={{ width: '0%' }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.6, duration: 0.8 }}
                      />
                    </div>

                    {/* Floating Particles on Hover */}
                    {hoveredIndex === index && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-2 h-2 bg-gradient-to-r ${step.gradient} rounded-full`}
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
                              delay: i * 0.25,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
