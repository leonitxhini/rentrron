'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/components/LanguageProvider';
import Image from 'next/image';
import { Check, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { generateWhatsAppMessage } from '@/lib/whatsapp';

export default function BookingSummaryPage() {
  const { t, language } = useLanguage();

  const steps = [
    { number: 1, label: 'Enter Ride Details', completed: true },
    { number: 2, label: 'Choose a Vehicle', completed: true },
    { number: 3, label: 'Enter Contact Details', completed: true },
    { number: 4, label: 'Booking Summary', current: true },
  ];

  // Mock booking summary data
  const bookingSummary = {
    car: 'Audi A6',
    serviceType: 'Hourly',
    pickupLocation: 'Switzerland Park, Chandragiri',
    dropoffLocation: 'Switzerland Park, Chandragiri',
    pickupDate: '17-05-2022',
    pickupTime: '8:00',
    returnDate: '17-05-2022',
    returnTime: '15:00',
    totalDistance: '0 km',
    totalTime: '7 h 0 m',
    subtotal: '$420.00',
    tax: '$30.00',
    total: '$450.00',
    contact: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
    },
  };

  const handleConfirmBooking = () => {
    const message = generateWhatsAppMessage({
      car: bookingSummary.car,
      fromDate: bookingSummary.pickupDate,
      toDate: bookingSummary.returnDate,
      location: bookingSummary.pickupLocation,
      lang: language,
    });
    window.open(message, '_blank');
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
            href="/booking/contact"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Contact Details
          </Link>

          <div className="bg-dark-light rounded-2xl p-8 border border-white/5">
            <h2 className="text-3xl font-bold text-white mb-8">Booking Summary</h2>
            
            <div className="space-y-6">
              {/* Vehicle Info */}
              <div className="border-b border-white/5 pb-6">
                <h3 className="text-xl font-bold text-white mb-4">Selected Vehicle</h3>
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400"
                      alt={bookingSummary.car}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{bookingSummary.car}</p>
                    <p className="text-white/60">{bookingSummary.serviceType}</p>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="border-b border-white/5 pb-6">
                <h3 className="text-xl font-bold text-white mb-4">Trip Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Pickup Location</p>
                    <p className="text-white font-semibold">{bookingSummary.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Drop-off Location</p>
                    <p className="text-white font-semibold">{bookingSummary.dropoffLocation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Pickup Date & Time</p>
                    <p className="text-white font-semibold">
                      {bookingSummary.pickupDate} at {bookingSummary.pickupTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Return Date & Time</p>
                    <p className="text-white font-semibold">
                      {bookingSummary.returnDate} at {bookingSummary.returnTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-b border-white/5 pb-6">
                <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Name</p>
                    <p className="text-white font-semibold">{bookingSummary.contact.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Email</p>
                    <p className="text-white font-semibold">{bookingSummary.contact.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Phone</p>
                    <p className="text-white font-semibold">{bookingSummary.contact.phone}</p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Price Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>{bookingSummary.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Tax</span>
                    <span>{bookingSummary.tax}</span>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Total</span>
                    <span className="text-3xl font-bold text-accent">{bookingSummary.total}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Link
                  href="/booking/contact"
                  className="px-8 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                >
                  Back
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirmBooking}
                  className="px-10 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/30"
                >
                  Confirm Booking
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

