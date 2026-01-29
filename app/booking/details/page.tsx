'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/components/LanguageProvider';
import Image from 'next/image';
import { MapPin, Calendar, Clock, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BookingDetailsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [formData, setFormData] = useState({
    pickupLocation: 'Prishtina International Airport',
    dropoffLocation: 'Prishtina International Airport',
    pickupDate: '27.01.2026',
    pickupTime: '',
    returnDate: '28.01.2026',
    returnTime: '',
  });

  const steps = [
    { number: 1, label: 'Enter Ride Details', current: true },
    { number: 2, label: 'Choose a Vehicle', upcoming: true },
    { number: 3, label: 'Enter Contact Details', upcoming: true },
    { number: 4, label: 'Booking Summary', upcoming: true },
  ];

  const locations = [
    'Prishtina International Airport',
    'Skopje International Airport',
    'Ferizaj',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/booking');
  };

  return (
    <main className="relative min-h-screen bg-[#0A1929]">
      {/* Hero Banner with integrated Navbar */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920"
            alt="Booking"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1929]/95 to-[#0A1929]" />
        </div>
        
        {/* Transparent Navbar */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center pt-20 pb-12">
          <div className="container mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white mb-2"
            >
              Booking
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-sm tracking-wider"
            >
              HOME - BOOKING
            </motion.p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-[#0A1929] py-6 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      step.current
                        ? 'bg-accent text-white border-2 border-accent shadow-lg shadow-accent/50'
                        : 'bg-white/5 text-white/40 border-2 border-white/10'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      step.current ? 'text-white' : 'text-white/40'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 rounded-full ${
                      step.current ? 'bg-accent/30' : 'bg-white/5'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 px-4 bg-[#0A1929]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">Enter Ride Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Top Row */}
              <div className="booking-form-top-row grid grid-cols-1 min-[480px]:grid-cols-3 sm:grid-cols-3 landscape:grid-cols-3 gap-6">
                {/* Pick-up Location */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                    <MapPin size={18} className="text-accent" />
                    Pick-up Location
                  </label>
                  <div className="relative">
                    <select
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      className="w-full px-4 py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white font-semibold focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer group-hover:border-white/20"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc} className="bg-[#0A1929]">
                          {loc}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={20}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Drop-off Location */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                    <MapPin size={18} className="text-accent" />
                    Drop-off Location
                  </label>
                  <div className="relative">
                    <select
                      value={formData.dropoffLocation}
                      onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                      className="w-full px-4 py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white font-semibold focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer group-hover:border-white/20"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc} className="bg-[#0A1929]">
                          {loc}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={20}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Pick-up Date */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                    <Calendar size={18} className="text-accent" />
                    Pick-up Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.pickupDate}
                      onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                      placeholder="DD.MM.YYYY"
                      className="w-full px-4 py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white font-semibold focus:outline-none focus:border-accent transition-all group-hover:border-white/20"
                    />
                    <Calendar
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="booking-form-bottom-row grid grid-cols-1 min-[480px]:grid-cols-4 sm:grid-cols-4 md:grid-cols-4 landscape:grid-cols-4 gap-6">
                {/* Pick-up Time */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                    <Clock size={18} className="text-accent" />
                    Pick-up Time
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                      placeholder="--:--"
                      className="w-full px-4 py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white font-semibold focus:outline-none focus:border-accent transition-all group-hover:border-white/20"
                    />
                    <Clock
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Return Date */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                    <Calendar size={18} className="text-accent" />
                    Return Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      placeholder="DD.MM.YYYY"
                      className="w-full px-4 py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white font-semibold focus:outline-none focus:border-accent transition-all group-hover:border-white/20"
                    />
                    <Calendar
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Return Time */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                    <Clock size={18} className="text-accent" />
                    Return Time
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.returnTime}
                      onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                      placeholder="--:--"
                      className="w-full px-4 py-4 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white font-semibold focus:outline-none focus:border-accent transition-all group-hover:border-white/20"
                    />
                    <Clock
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Continue Booking Button */}
                <div className="flex items-end">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-[60px] bg-accent text-white font-black text-base rounded-xl shadow-xl hover:shadow-2xl hover:shadow-accent/50 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    <span className="relative z-10">Continue Booking</span>
                    <ArrowRight
                      size={20}
                      className="relative z-10 group-hover:translate-x-1 transition-transform"
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
          </motion.div>
        </div>
      </section>
    </main>
  );
}

