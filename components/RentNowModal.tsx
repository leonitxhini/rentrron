'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Users, Settings, Fuel as FuelIcon, Gauge, MessageCircle, Check } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { generateWhatsAppMessage } from '@/lib/whatsapp';
import Image from 'next/image';
import { Car } from '@/data/cars';

interface RentNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
}

export function RentNowModal({ isOpen, onClose, car }: RentNowModalProps) {
  const { t, language } = useLanguage();
  const [pickupLocation, setPickupLocation] = useState(car?.locationAvailability[0] || '');
  const [dropoffLocation, setDropoffLocation] = useState(car?.locationAvailability[0] || '');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('10:00');

  if (!car) return null;

  const handleBook = () => {
    const message = generateWhatsAppMessage({
      car: car.name,
      fromDate: pickupDate || 'TBD',
      toDate: returnDate || 'TBD',
      location: pickupLocation || car.locationAvailability[0],
      lang: language,
    });
    window.open(message, '_blank');
    onClose();
  };

  const calculateDays = () => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 1;
  };

  const totalPrice = car.pricePerDay * calculateDays();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
          >
            <div 
              className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Car Image */}
              <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <Image
                  src={car.images[0] || '/cars/audi-a6.png'}
                  alt={car.name}
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-all"
                >
                  <X size={24} />
                </button>

                {/* Car Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-0">
                    <div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{car.name}</h2>
                      <p className="text-white/80 text-sm sm:text-lg">{car.brand} {car.model}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1">
                        €{car.pricePerDay}
                        <span className="text-lg sm:text-xl font-normal text-white/70">/day</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6 md:p-8">
                  {/* Car Specs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                      <Users size={20} className="sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600">{t.carDetails.seats}</p>
                        <p className="text-base sm:text-lg font-bold text-gray-900">{car.seats}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                      <Settings size={20} className="sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600">{t.carDetails.transmission}</p>
                        <p className="text-base sm:text-lg font-bold text-gray-900">{car.transmission}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                      <FuelIcon size={20} className="sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600">{t.carDetails.fuel}</p>
                        <p className="text-base sm:text-lg font-bold text-gray-900">{car.fuel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                      <Gauge size={20} className="sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600">{t.carDetails.horsepower}</p>
                        <p className="text-base sm:text-lg font-bold text-gray-900">{car.horsepower} HP</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Form */}
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{t.quickBooking.title}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {/* Pickup Location */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <MapPin size={16} className="sm:w-[18px] sm:h-[18px] text-blue-600 flex-shrink-0" />
                          {t.quickBooking.pickupLocation}
                        </label>
                        <select
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-gray-900 bg-white font-medium text-sm sm:text-base"
                        >
                          {car.locationAvailability.map((location) => (
                            <option key={location} value={location} className="text-gray-900">{location}</option>
                          ))}
                        </select>
                      </div>

                      {/* Dropoff Location */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <MapPin size={18} className="text-blue-600" />
                          {t.quickBooking.dropoffLocation}
                        </label>
                        <select
                          value={dropoffLocation}
                          onChange={(e) => setDropoffLocation(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-gray-900 bg-white font-medium"
                        >
                          {car.locationAvailability.map((location) => (
                            <option key={location} value={location} className="text-gray-900">{location}</option>
                          ))}
                        </select>
                      </div>

                      {/* Pickup Date */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Calendar size={18} className="text-blue-600" />
                          {t.quickBooking.pickupDate}
                        </label>
                        <input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-gray-900 bg-white font-medium text-sm sm:text-base"
                        />
                      </div>

                      {/* Pickup Time */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Clock size={18} className="text-blue-600" />
                          {t.quickBooking.pickupTime}
                        </label>
                        <input
                          type="time"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-gray-900 bg-white font-medium text-sm sm:text-base"
                        />
                      </div>

                      {/* Return Date */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Calendar size={18} className="text-blue-600" />
                          {t.quickBooking.returnDate}
                        </label>
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          min={pickupDate || new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-gray-900 bg-white font-medium"
                        />
                      </div>

                      {/* Return Time */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Clock size={18} className="text-blue-600" />
                          {t.quickBooking.returnTime}
                        </label>
                        <input
                          type="time"
                          value={returnTime}
                          onChange={(e) => setReturnTime(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-gray-900 bg-white font-medium"
                        />
                      </div>
                    </div>

                    {/* Price Summary */}
                    {(pickupDate && returnDate) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Rental Period</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {calculateDays()} {calculateDays() === 1 ? 'Day' : 'Days'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Total Price</p>
                            <p className="text-3xl font-black text-blue-600">
                              €{totalPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer with Action Buttons */}
              <div className="border-t border-gray-200 p-4 sm:p-6 md:p-8 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full sm:flex-1 px-6 py-3.5 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all text-sm sm:text-base"
                  >
                    {t.common.close}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBook}
                    className="w-full sm:flex-1 px-6 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                    <span>Book via WhatsApp</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

