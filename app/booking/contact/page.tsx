'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/components/LanguageProvider';
import Image from 'next/image';
import { Check, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ContactDetailsPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  const steps = [
    { number: 1, label: 'Enter Ride Details', completed: true },
    { number: 2, label: 'Choose a Vehicle', completed: true },
    { number: 3, label: 'Enter Contact Details', current: true },
    { number: 4, label: 'Booking Summary', upcoming: true },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to summary
    window.location.href = '/booking/summary';
  };

  return (
    <main className="relative min-h-screen bg-dark">
      {/* Hero Banner with integrated Navbar */}
      <section className="relative h-[100vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920"
            alt="Booking"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/90 to-dark" />
        </div>
        
        {/* Transparent Navbar */}
        <div className="relative z-50">
          <Navbar variant="transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center pt-20">
          <div className="container mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-2">Booking</h1>
            <p className="text-white/80 text-sm tracking-wider">HOME - BOOKING</p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-dark-light py-8 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                      step.completed
                        ? 'bg-accent text-white'
                        : step.current
                        ? 'bg-accent text-white border-2 border-accent shadow-lg shadow-accent/50'
                        : 'bg-white/5 text-white/40 border-2 border-white/10'
                    }`}
                  >
                    {step.completed ? <Check size={22} /> : step.number}
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      step.completed || step.current ? 'text-white' : 'text-white/40'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-6 rounded-full ${
                      step.completed ? 'bg-accent' : 'bg-white/5'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Vehicle Selection
          </Link>

          <div className="bg-dark-light rounded-2xl p-8 border border-white/5">
            <h2 className="text-3xl font-bold text-white mb-8">Enter Contact Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Link
                  href="/booking"
                  className="px-8 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                >
                  Back
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-10 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/30 flex items-center gap-2"
                >
                  Continue to Summary
                  <span>→</span>
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

