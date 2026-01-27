'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { generateWhatsAppMessage } from '@/lib/whatsapp';

export function QuickBookingBar() {
  const { t, language } = useLanguage();
  const [pickupLocation, setPickupLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [carType, setCarType] = useState('');

  const handleGetOffer = () => {
    const message = generateWhatsAppMessage({
      car: carType || t.quickBooking.carTypes.all,
      fromDate: fromDate || 'TBD',
      toDate: toDate || 'TBD',
      location: pickupLocation || t.quickBooking.locations.ferizaj,
      lang: language,
    });
    window.open(message, '_blank');
  };

  return (
    <section className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl"
      >
        <div className="glass-strong rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">
          <h2 className="text-2xl md:text-3xl font-black mb-8" style={{ letterSpacing: '-0.02em' }}>
            Find your dream car
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">
                {t.quickBooking.pickupLocation}
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
              >
                <option value="">{t.common.select}</option>
                <option value={t.quickBooking.locations.ferizaj}>
                  {t.quickBooking.locations.ferizaj}
                </option>
                <option value={t.quickBooking.locations.prishtina}>
                  {t.quickBooking.locations.prishtina}
                </option>
                <option value={t.quickBooking.locations.skopje}>
                  {t.quickBooking.locations.skopje}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">
                {t.quickBooking.fromDate}
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">
                {t.quickBooking.toDate}
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
              />
            </div>

            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetOffer}
                className="w-full px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/30"
              >
                {t.quickBooking.getOffer}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

