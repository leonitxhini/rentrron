'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { generateWhatsAppMessage } from '@/lib/whatsapp';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName?: string;
  defaultPickup?: string;
  defaultFromDate?: string;
  defaultToDate?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  carName = '',
  defaultPickup = '',
  defaultFromDate = '',
  defaultToDate = '',
}: BookingModalProps) {
  const { t, language } = useLanguage();
  const [pickupLocation, setPickupLocation] = useState(defaultPickup);
  const [dropoffLocation, setDropoffLocation] = useState(defaultPickup);
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);
  const [carType, setCarType] = useState('');

  const handleBook = () => {
    const message = generateWhatsAppMessage({
      car: carName || carType || t.quickBooking.carTypes.all,
      fromDate: fromDate || 'TBD',
      toDate: toDate || 'TBD',
      location: pickupLocation || t.quickBooking.locations.ferizaj,
      lang: language,
    });
    window.open(message, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-strong rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t.nav.bookNow}</h2>
                <button
                  onClick={onClose}
                  className="text-white/70 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
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
                  <label className="block text-sm font-medium mb-2">
                    {t.quickBooking.pickupDate}
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.quickBooking.returnDate}
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                  />
                </div>

                {!carName && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.quickBooking.carType}
                    </label>
                    <select
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                    >
                      <option value="">{t.common.select}</option>
                      <option value={t.quickBooking.carTypes.sedan}>
                        {t.quickBooking.carTypes.sedan}
                      </option>
                      <option value={t.quickBooking.carTypes.hatchback}>
                        {t.quickBooking.carTypes.hatchback}
                      </option>
                      <option value={t.quickBooking.carTypes.suv}>
                        {t.quickBooking.carTypes.suv}
                      </option>
                    </select>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBook}
                  className="w-full px-6 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent-light transition-all"
                >
                  {t.quickBooking.getOffer}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

