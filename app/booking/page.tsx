'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/components/LanguageProvider';
import Image from 'next/image';
import { MapPin, Calendar, Clock, ArrowRight, ChevronDown, Users, Briefcase, Check } from 'lucide-react';
import { cars } from '@/data/cars';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [expandedCar, setExpandedCar] = useState<string | null>(null);
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);
  const [formData, setFormData] = useState({
    pickupLocation: 'Prishtina International Airport',
    dropoffLocation: 'Prishtina International Airport',
    pickupDate: '27.01.2026',
    pickupTime: '',
    returnDate: '28.01.2026',
    returnTime: '',
  });

  const locations = [
    'Prishtina International Airport',
    'Skopje International Airport',
    'Ferizaj',
  ];

  // Mock booking data
  const bookingData = {
    serviceType: 'Hourly',
    pickupLocation: formData.pickupLocation,
    dropoffLocation: formData.dropoffLocation,
    pickupDate: formData.pickupDate,
    pickupTime: formData.pickupTime || '--:--',
    totalDistance: '0 km',
    totalTime: '7 h 0 m',
    total: '€450.00',
  };

  const steps = [
    { number: 1, label: 'Enter Ride Details', current: !showVehicleSelection, completed: showVehicleSelection },
    { number: 2, label: 'Choose a Vehicle', current: showVehicleSelection, completed: false },
    { number: 3, label: 'Enter Contact Details', upcoming: true },
    { number: 4, label: 'Booking Summary', upcoming: true },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowVehicleSelection(true);
  };

  return (
    <main className="relative min-h-screen bg-[#0A1929]">
      {/* Hero Banner with integrated Navbar */}
      <section className="relative min-h-[80vh] overflow-hidden">
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
              className="text-white/80 text-sm tracking-wider mb-12"
            >
              HOME - BOOKING
            </motion.p>

            {/* Booking Form in Hero */}
            {!showVehicleSelection && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-6xl mx-auto"
              >
                <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Top Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                </div>
              </motion.div>
            )}
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
                      step.completed
                        ? 'bg-accent text-white'
                        : step.current
                        ? 'bg-accent text-white border-2 border-accent shadow-lg shadow-accent/50'
                        : 'bg-white/5 text-white/40 border-2 border-white/10'
                    }`}
                  >
                    {step.completed ? <Check size={20} /> : step.number}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      step.completed || step.current ? 'text-white' : 'text-white/40'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 rounded-full ${
                      step.completed ? 'bg-accent' : 'bg-white/5'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Selection */}
      {showVehicleSelection && (
        <section className="py-12 px-4 bg-[#0A1929]">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Summary */}
              <div className="lg:col-span-1">
                <div className="glass-card rounded-2xl p-6 sticky top-24 border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-6">Summary</h2>
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">SERVICE TYPE</p>
                      <p className="text-white font-semibold">{bookingData.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">PICKUP LOCATION</p>
                      <p className="text-white font-semibold text-sm">{bookingData.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">DROP OFF LOCATION</p>
                      <p className="text-white font-semibold text-sm">{bookingData.dropoffLocation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">PICKUP DATE, TIME</p>
                      <p className="text-white font-semibold text-sm">
                        {bookingData.pickupDate}, {bookingData.pickupTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">TOTAL DISTANCE</p>
                      <p className="text-white font-semibold">{bookingData.totalDistance}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">TOTAL TIME</p>
                      <p className="text-white font-semibold">{bookingData.totalTime}</p>
                    </div>
                    <div className="pt-6 border-t border-white/10">
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-white">Total</p>
                        <p className="text-2xl font-bold text-accent">{bookingData.total}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Vehicle Selection */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold text-white mb-2">Choose a Vehicle</h2>
                
                {cars.slice(0, 6).map((car) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-2xl overflow-hidden border border-white/10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
                      {/* Car Image */}
                      <div className="md:col-span-4 relative h-48 md:h-full min-h-[200px] rounded-lg overflow-hidden">
                        <Image
                          src={car.images[0] || 'https://via.placeholder.com/400x300'}
                          alt={car.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Car Info */}
                      <div className="md:col-span-8 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-3">{car.name}</h3>
                          <div className="flex items-center gap-8 mb-4">
                            <div className="flex items-center gap-2">
                              <Users size={18} className="text-white/50" />
                              <span className="text-white font-semibold">{car.seats}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase size={18} className="text-white/50" />
                              <span className="text-white font-semibold">2</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-3xl font-bold text-accent mb-2">
                              €{car.pricePerDay}
                            </p>
                            <button
                              onClick={() =>
                                setExpandedCar(expandedCar === car.id ? null : car.id)
                              }
                              className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors text-sm"
                            >
                              More Info
                              <ChevronDown
                                className={`transition-transform ${
                                  expandedCar === car.id ? 'rotate-180' : ''
                                }`}
                                size={16}
                              />
                            </button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedVehicle(car.id)}
                            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                              selectedVehicle === car.id
                                ? 'bg-accent text-white shadow-lg shadow-accent/30'
                                : 'bg-white/5 text-white hover:bg-accent border border-white/10'
                            }`}
                          >
                            {selectedVehicle === car.id ? 'Selected' : 'Select'}
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Info */}
                    {expandedCar === car.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 border-t border-white/10 pt-4 bg-[#0A1929]/50"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div>
                            <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Transmission</p>
                            <p className="text-white font-semibold">{car.transmission}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Fuel</p>
                            <p className="text-white font-semibold">{car.fuel}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Horsepower</p>
                            <p className="text-white font-semibold">{car.horsepower} HP</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Air Conditioning</p>
                            <p className="text-white font-semibold">{car.ac ? 'Yes' : 'No'}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* Continue Button */}
                {selectedVehicle && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end pt-8"
                  >
                    <Link
                      href="/booking/contact"
                      className="px-10 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/30 flex items-center gap-2"
                    >
                      Continue to Contact Details
                      <span>→</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
