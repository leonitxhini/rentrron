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
    <section className="bg-gradient-to-b from-[#0A1929] via-[#0A1929] to-[#0A1929] py-12 sm:py-16 relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
            <span>{t.howItWorks.title.split(' ')[0]} {t.howItWorks.title.split(' ')[1]}</span>{' '}
            <span className="gradient-text">{t.howItWorks.title.split(' ')[2]}</span>
          </h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
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
                    <div className="h-full bg-accent/30 rounded-full relative overflow-hidden">
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

                  {/* Main Card */}
                  <div className="relative bg-[#0A1929]/50 backdrop-blur-xl rounded-xl p-5 border border-white/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-white/20 h-full flex flex-col items-center text-center">

                    {/* Step Number Badge */}
                    <div className={`absolute top-3 right-3 w-8 h-8 bg-accent rounded-lg flex items-center justify-center z-20`}>
                      <span className="text-white font-black text-sm">{step.number}</span>
                    </div>

                    {/* Icon Container */}
                    <div className="relative mb-4 mt-2">

                      {/* Icon Circle */}
                      <div className={`relative w-16 h-16 bg-accent rounded-xl flex items-center justify-center z-10`}>
                        <Icon size={32} className="text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
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
