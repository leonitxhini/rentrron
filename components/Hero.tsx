'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from './Logo';
import { MapPin, Calendar, Clock, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export function Hero() {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState<{
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
  }>({
    pickupLocation: t.quickBooking.locations.prishtina,
    dropoffLocation: t.quickBooking.locations.prishtina,
    pickupDate: '2026-01-27',
    pickupTime: '10:00',
    returnDate: '2026-01-28',
    returnTime: '10:00',
  });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const locations = [
    t.quickBooking.locations.prishtina,
    t.quickBooking.locations.skopje,
    t.quickBooking.locations.ferizaj,
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      returnDate: formData.returnDate,
      returnTime: formData.returnTime,
    });
    window.location.href = `/booking?${params.toString()}`;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.1);
        mouseY.set((e.clientY - centerY) * 0.1);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col bg-[#0A1929] overflow-x-hidden overflow-y-visible pt-16 sm:pt-20"
      style={{ perspective: '1000px' }}
    >
      {/* Background Image - Full Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/hero-head.png"
          alt="Background"
          fill
          className="object-cover"
          priority
          unoptimized
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.includes('.png')) {
              target.src = target.src.replace('.png', '.jpg');
            } else {
              target.style.display = 'none';
            }
          }}
        />
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1929]/40 via-[#0A1929]/20 to-[#0A1929]/60" />
      </div>

      {/* Subtle Animated Background Gradient Overlay */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
        
      </div>


      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-20 flex-1 flex flex-col justify-center items-center py-8 sm:py-12">


        {/* Hero Content with Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center justify-center mb-12 text-center"
        >
          {/* Cool Slogan */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 relative z-10 overflow-visible"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-normal sm:leading-tight overflow-visible py-2">
              <span className="block pb-2">{t.hero.sloganPart1}</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent overflow-visible pt-1 pb-2">
                {t.hero.sloganPart2}
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto"
            >
              {t.hero.subtitle}
            </motion.p>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full max-w-6xl mx-auto"
          >
            <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/10">
              <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                {/* Top Row */}
                <div className="booking-form-top-row grid grid-cols-1 min-[480px]:grid-cols-3 sm:grid-cols-3 landscape:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Pick-up Location */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-2 sm:mb-3">
                      <MapPin size={16} className="text-accent flex-shrink-0" />
                      <span>{t.quickBooking.pickupLocation}</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer group-hover:border-white/20"
                      >
                        {locations.map((loc) => (
                          <option key={loc} value={loc} className="bg-[#0A1929]">
                            {loc}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Drop-off Location */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-2 sm:mb-3">
                      <MapPin size={16} className="text-accent flex-shrink-0" />
                      <span>{t.quickBooking.dropoffLocation}</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.dropoffLocation}
                        onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer group-hover:border-white/20"
                      >
                        {locations.map((loc) => (
                          <option key={loc} value={loc} className="bg-[#0A1929]">
                            {loc}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Pick-up Date */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-2 sm:mb-3">
                      <Calendar size={16} className="text-accent flex-shrink-0" />
                      <span>{t.quickBooking.pickupDate}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold focus:outline-none focus:border-accent transition-all group-hover:border-white/20 [color-scheme:dark]"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="booking-form-bottom-row grid grid-cols-1 min-[480px]:grid-cols-4 sm:grid-cols-4 md:grid-cols-4 landscape:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
                  {/* Pick-up Time */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-2 sm:mb-3">
                      <Clock size={16} className="text-accent flex-shrink-0" />
                      <span>{t.quickBooking.pickupTime}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={formData.pickupTime}
                        onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold focus:outline-none focus:border-accent transition-all group-hover:border-white/20 [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Return Date */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-2 sm:mb-3">
                      <Calendar size={16} className="text-accent flex-shrink-0" />
                      <span>{t.quickBooking.returnDate}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.returnDate}
                        onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold focus:outline-none focus:border-accent transition-all group-hover:border-white/20 [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Return Time */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-2 sm:mb-3">
                      <Clock size={16} className="text-accent flex-shrink-0" />
                      <span>{t.quickBooking.returnTime}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={formData.returnTime}
                        onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold focus:outline-none focus:border-accent transition-all group-hover:border-white/20 [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Continue Booking Button */}
                  <div className="booking-form-button-col flex items-end sm:col-span-2 md:col-span-1 landscape:col-span-1">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-[52px] sm:h-[60px] bg-accent text-white font-black text-sm sm:text-base rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl hover:shadow-accent/50 transition-all flex items-center justify-center gap-2 sm:gap-3 group relative overflow-hidden touch-manipulation"
                    >
                      <span className="relative z-10">{t.quickBooking.continueBooking}</span>
                      <ArrowRight
                        size={18}
                        className="relative z-10 group-hover:translate-x-1 transition-transform flex-shrink-0"
                      />
                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
}
