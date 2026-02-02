'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageCircle, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  FileText,
  Shield
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { generateWhatsAppMessage } from '@/lib/whatsapp';
import { Footer } from '@/components/Footer';
import { cars, Car } from '@/data/cars';
import Image from 'next/image';
import { Car as CarIcon, Settings, Users, Zap, Gauge, Check } from 'lucide-react';

type BookingStep = 'details' | 'car' | 'contact' | 'summary';

export default function BookingPage() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<BookingStep>('details');
  
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '10:00',
    returnDate: '',
    returnTime: '10:00',
    carType: '',
    selectedCarId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  // Load data from URL params
  useEffect(() => {
    const pickupLocation = searchParams.get('pickupLocation') || '';
    const dropoffLocation = searchParams.get('dropoffLocation') || '';
    const pickupDate = searchParams.get('pickupDate') || '';
    const pickupTime = searchParams.get('pickupTime') || '10:00';
    const returnDate = searchParams.get('returnDate') || '';
    const returnTime = searchParams.get('returnTime') || '10:00';
    const carType = searchParams.get('carType') || '';

    setFormData(prev => ({
      ...prev,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      carType,
    }));
  }, [searchParams]);

  const locations = [
    t.quickBooking.locations.ferizaj,
    t.quickBooking.locations.prishtina,
    t.quickBooking.locations.skopje,
  ];

  const calculateDays = () => {
    if (formData.pickupDate && formData.returnDate) {
      const start = new Date(formData.pickupDate);
      const end = new Date(formData.returnDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 1;
  };

  const selectedCar = cars.find(car => car.id === formData.selectedCarId);
  
  const availableCars = cars.filter(car => {
    if (!formData.pickupLocation) return true;
    return car.locationAvailability.includes(formData.pickupLocation as any);
  });

  const validateStep = (step: BookingStep): boolean => {
    if (step === 'details') {
      return !!(
        formData.pickupLocation &&
        formData.dropoffLocation &&
        formData.pickupDate &&
        formData.returnDate
      );
    }
    if (step === 'car') {
      return !!formData.selectedCarId;
    }
    if (step === 'contact') {
      return !!(
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.phone
      );
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 'details' && validateStep('details')) {
      setCurrentStep('car');
    } else if (currentStep === 'car' && validateStep('car')) {
      setCurrentStep('contact');
    } else if (currentStep === 'contact' && validateStep('contact')) {
      setCurrentStep('summary');
    }
  };

  const handleBack = () => {
    if (currentStep === 'car') {
      setCurrentStep('details');
    } else if (currentStep === 'contact') {
      setCurrentStep('car');
    } else if (currentStep === 'summary') {
      setCurrentStep('contact');
    }
  };

  const handleSubmit = () => {
    const carName = selectedCar ? selectedCar.name : (formData.carType || t.quickBooking.carTypes.all);
    const days = calculateDays();
    const totalPrice = selectedCar ? (selectedCar.pricePerDay * days).toFixed(2) : (days * 50).toFixed(2);
    
    // Get translated location names
    const getLocationName = (location: string) => {
      if (location === t.quickBooking.locations.ferizaj) return location;
      if (location === t.quickBooking.locations.prishtina) return location;
      if (location === t.quickBooking.locations.skopje) return location;
      return location; // Fallback to original if not found
    };
    
    const pickupLocation = getLocationName(formData.pickupLocation);
    const dropoffLocation = getLocationName(formData.dropoffLocation);
    
    // Create a well-formatted WhatsApp message based on selected language
    const greeting = language === 'en' 
      ? 'Hello RRON Rent A Car! 👋\n\nI would like to make a booking:\n\n'
      : 'Përshëndetje RRON Rent A Car! 👋\n\nDua të bëj një rezervim:\n\n';
    
    const bookingDetails = language === 'en'
      ? `📅 *Booking Details:*\n` +
        `🚗 Vehicle: ${carName}\n` +
        `📍 Pickup Location: ${pickupLocation}\n` +
        `📍 Drop-off Location: ${dropoffLocation}\n` +
        `📅 Pickup Date & Time: ${formData.pickupDate} at ${formData.pickupTime}\n` +
        `📅 Return Date & Time: ${formData.returnDate} at ${formData.returnTime}\n` +
        `⏱️ Rental Period: ${days} ${days === 1 ? 'day' : 'days'}\n` +
        `💰 Estimated Price: €${totalPrice}\n\n`
      : `📅 *Detajet e Rezervimit:*\n` +
        `🚗 Automjeti: ${carName}\n` +
        `📍 Vendi i Marrjes: ${pickupLocation}\n` +
        `📍 Vendi i Dorëzimit: ${dropoffLocation}\n` +
        `📅 Data dhe Ora e Marrjes: ${formData.pickupDate} në ${formData.pickupTime}\n` +
        `📅 Data dhe Ora e Kthimit: ${formData.returnDate} në ${formData.returnTime}\n` +
        `⏱️ Periudha e Qirasë: ${days} ${days === 1 ? 'ditë' : 'ditë'}\n` +
        `💰 Çmimi i Vlerësuar: €${totalPrice}\n\n`;
    
    const contactInfo = language === 'en'
      ? `👤 *Contact Information:*\n` +
        `Name: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}`
      : `👤 *Informacioni i Kontaktit:*\n` +
        `Emri: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n` +
        `Telefoni: ${formData.phone}`;
    
    const specialRequests = formData.specialRequests 
      ? (language === 'en' 
          ? `\n\n💬 *Special Requests:*\n${formData.specialRequests}`
          : `\n\n💬 *Kërkesa të Veçanta:*\n${formData.specialRequests}`)
      : '';
    
    const fullMessage = greeting + bookingDetails + contactInfo + specialRequests;
    
    const whatsappNumber = '38349123456';
    const encodedMessage = encodeURIComponent(fullMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const steps = [
    { id: 'details', label: t.quickBooking.title, icon: Calendar },
    { id: 'car', label: t.fleet.carCatalogue, icon: CarIcon },
    { id: 'contact', label: t.contact.title, icon: User },
    { id: 'summary', label: t.booking.summary, icon: CheckCircle2 },
  ];

  return (
    <main className="min-h-screen bg-[#0A1929] pt-24 pb-16">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10 -z-10">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: '0%' }}
                animate={{
                  width:
                    currentStep === 'details'
                      ? '0%'
                      : currentStep === 'car'
                      ? '33%'
                      : currentStep === 'contact'
                      ? '66%'
                      : '100%',
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = steps.findIndex((s) => s.id === currentStep) === index;
              const isCompleted =
                steps.findIndex((s) => s.id === currentStep) > index;

              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? 'bg-accent border-transparent'
                        : isActive
                        ? 'bg-white/10 border-accent'
                        : 'bg-white/5 border-white/20'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon
                      size={20}
                      className={
                        isCompleted || isActive
                          ? 'text-white'
                          : 'text-white/50'
                      }
                    />
                  </motion.div>
                  <span
                    className={`mt-2 text-xs sm:text-sm font-medium ${
                      isActive ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10"
          >
            <AnimatePresence mode="wait">
              {currentStep === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                      {t.quickBooking.title}
                    </h2>
                    <p className="text-white/70">
                      {t.booking.pleaseEnterTravelDates}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pickup Location */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <MapPin size={18} className="text-accent" />
                        {t.quickBooking.pickupLocation}
                      </label>
                      <select
                        value={formData.pickupLocation}
                        onChange={(e) =>
                          setFormData({ ...formData, pickupLocation: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all"
                      >
                        <option value="" className="bg-[#0A1929]">
                          {t.common.select}
                        </option>
                        {locations.map((loc) => (
                          <option key={loc} value={loc} className="bg-[#0A1929]">
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Dropoff Location */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <MapPin size={18} className="text-accent" />
                        {t.quickBooking.dropoffLocation}
                      </label>
                      <select
                        value={formData.dropoffLocation}
                        onChange={(e) =>
                          setFormData({ ...formData, dropoffLocation: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all"
                      >
                        <option value="" className="bg-[#0A1929]">
                          {t.common.select}
                        </option>
                        {locations.map((loc) => (
                          <option key={loc} value={loc} className="bg-[#0A1929]">
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Pickup Date */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <Calendar size={18} className="text-accent" />
                        {t.quickBooking.pickupDate}
                      </label>
                      <input
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) =>
                          setFormData({ ...formData, pickupDate: e.target.value })
                        }
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all [color-scheme:dark]"
                      />
                    </div>

                    {/* Pickup Time */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <Clock size={18} className="text-accent" />
                        {t.quickBooking.pickupTime}
                      </label>
                      <input
                        type="time"
                        value={formData.pickupTime}
                        onChange={(e) =>
                          setFormData({ ...formData, pickupTime: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all [color-scheme:dark]"
                      />
                    </div>

                    {/* Return Date */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <Calendar size={18} className="text-accent" />
                        {t.quickBooking.returnDate}
                      </label>
                      <input
                        type="date"
                        value={formData.returnDate}
                        onChange={(e) =>
                          setFormData({ ...formData, returnDate: e.target.value })
                        }
                        min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all [color-scheme:dark]"
                      />
                    </div>

                    {/* Return Time */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <Clock size={18} className="text-accent" />
                        {t.quickBooking.returnTime}
                      </label>
                      <input
                        type="time"
                        value={formData.returnTime}
                        onChange={(e) =>
                          setFormData({ ...formData, returnTime: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all [color-scheme:dark]"
                      />
                    </div>

                    {/* Car Type */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <FileText size={18} className="text-accent" />
                        {t.quickBooking.carType} ({t.common.select})
                      </label>
                      <select
                        value={formData.carType}
                        onChange={(e) =>
                          setFormData({ ...formData, carType: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all"
                      >
                        <option value="" className="bg-[#0A1929]">
                          {t.quickBooking.carTypes.all}
                        </option>
                        <option value={t.quickBooking.carTypes.sedan} className="bg-[#0A1929]">
                          {t.quickBooking.carTypes.sedan}
                        </option>
                        <option value={t.quickBooking.carTypes.hatchback} className="bg-[#0A1929]">
                          {t.quickBooking.carTypes.hatchback}
                        </option>
                        <option value={t.quickBooking.carTypes.suv} className="bg-[#0A1929]">
                          {t.quickBooking.carTypes.suv}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Price Preview */}
                  {formData.pickupDate && formData.returnDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-accent/10 rounded-xl p-6 border border-accent/30"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/70 text-sm mb-1">{t.booking.rentalPeriod}</p>
                          <p className="text-white font-bold text-lg">
                            {calculateDays()} {calculateDays() === 1 ? t.booking.day : t.booking.days}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/70 text-sm mb-1">{t.booking.estimatedPrice}</p>
                          <p className="text-3xl font-black text-accent">
                            €{calculateDays() * 50}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {currentStep === 'car' && (
                <motion.div
                  key="car"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                      {t.fleet.carCatalogue}
                    </h2>
                    <p className="text-white/70">
                      {t.fleet.exploreCars}
                    </p>
                  </div>

                  {availableCars.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-white/70 text-lg">
                        {t.fleet.noVehiclesFound}
                      </p>
                      <p className="text-white/50 text-sm mt-2">
                        {t.fleet.tryAdjustingFilters}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {availableCars.map((car) => (
                        <motion.div
                          key={car.id}
                          whileHover={{ y: -8 }}
                          onClick={() => setFormData({ ...formData, selectedCarId: car.id })}
                          className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                            formData.selectedCarId === car.id
                              ? 'border-accent shadow-xl shadow-accent/30'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          {/* Selected Badge */}
                          {formData.selectedCarId === car.id && (
                            <div className="absolute top-4 left-4 z-10">
                              <div className="bg-accent px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
                                <Check size={16} className="text-white" />
                                <span className="text-xs font-semibold text-white">Selected</span>
                              </div>
                            </div>
                          )}

                          {/* Image Section */}
                          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                            <Image
                              src={car.images[0] || '/cars/audi-a6-2021-white.png'}
                              alt={car.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            
                            {/* Price Badge */}
                            <div className="absolute top-4 right-4">
                              <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg">
                                <div className="flex items-baseline gap-1">
                                  <span className="text-2xl font-bold text-gray-900">€{car.pricePerDay}</span>
                                  <span className="text-xs font-medium text-gray-600">{t.fleet.perDay}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-6 bg-white/5 backdrop-blur-sm">
                            {/* Car Name */}
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-white mb-1">{car.name}</h3>
                              <p className="text-sm text-white/60">{car.brand} • {car.model}</p>
                            </div>

                            {/* Specifications */}
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              <div className="flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded-lg border border-white/10">
                                <Settings size={14} className="text-accent flex-shrink-0" />
                                <div className="flex flex-col">
                                  <span className="text-xs text-white/60">{t.carDetails.transmission}</span>
                                  <span className="text-xs font-semibold text-white">{car.transmission}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded-lg border border-white/10">
                                <Zap size={14} className="text-accent flex-shrink-0" />
                                <div className="flex flex-col">
                                  <span className="text-xs text-white/60">{t.carDetails.fuel}</span>
                                  <span className="text-xs font-semibold text-white">{car.fuel}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded-lg border border-white/10">
                                <Users size={14} className="text-accent flex-shrink-0" />
                                <div className="flex flex-col">
                                  <span className="text-xs text-white/60">{t.carDetails.seats}</span>
                                  <span className="text-xs font-semibold text-white">{car.seats}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded-lg border border-white/10">
                                <Gauge size={14} className="text-accent flex-shrink-0" />
                                <div className="flex flex-col">
                                  <span className="text-xs text-white/60">Power</span>
                                  <span className="text-xs font-semibold text-white">{car.horsepower} HP</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Price Preview */}
                  {selectedCar && formData.pickupDate && formData.returnDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-accent/10 rounded-xl p-6 border border-accent/30"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/70 text-sm mb-1">{t.booking.rentalPeriod}</p>
                          <p className="text-white font-bold text-lg">
                            {calculateDays()} {calculateDays() === 1 ? t.booking.day : t.booking.days}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/70 text-sm mb-1">{t.booking.estimatedPrice}</p>
                          <p className="text-3xl font-black text-accent">
                            €{(selectedCar.pricePerDay * calculateDays()).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {currentStep === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                      {t.contact.title}
                    </h2>
                    <p className="text-white/70">
                      {t.booking.pleaseEnterContactInfo}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <User size={18} className="text-accent" />
                        {t.contact.form.name} *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        placeholder="John"
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all placeholder-white/30"
                        required
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <User size={18} className="text-accent" />
                        {t.booking.lastName} *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        placeholder="Doe"
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all placeholder-white/30"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <Mail size={18} className="text-accent" />
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john.doe@example.com"
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all placeholder-white/30"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <Phone size={18} className="text-accent" />
                        {t.contact.form.phone} *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+383 49 123 456"
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all placeholder-white/30"
                        required
                      />
                    </div>

                    {/* Special Requests */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                        <MessageCircle size={18} className="text-accent" />
                        {t.booking.specialRequests} ({t.booking.optional})
                      </label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) =>
                          setFormData({ ...formData, specialRequests: e.target.value })
                        }
                        placeholder={t.contact.form.message}
                        rows={4}
                        className="w-full px-4 py-3.5 bg-[#0A1929]/50 border-2 border-white/10 rounded-xl text-white text-base font-semibold focus:outline-none focus:border-accent transition-all placeholder-white/30 resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'summary' && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                      {t.booking.summary}
                    </h2>
                    <p className="text-white/70">
                      {t.booking.pleaseReviewDetails}
                    </p>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-4">
                    <div className="glass-card rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-accent" />
                        {t.booking.travelDates}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                        <div>
                          <p className="text-sm text-white/60 mb-1">{t.booking.pickupLocation}</p>
                          <p className="font-semibold">{formData.pickupLocation}</p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60 mb-1">{t.booking.dropoffLocation}</p>
                          <p className="font-semibold">{formData.dropoffLocation}</p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60 mb-1">{t.booking.pickupDateTime}</p>
                          <p className="font-semibold">
                            {formData.pickupDate} {t.quickBooking.pickupTime.toLowerCase()} {formData.pickupTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60 mb-1">{t.booking.returnDateTime}</p>
                          <p className="font-semibold">
                            {formData.returnDate} {t.quickBooking.returnTime.toLowerCase()} {formData.returnTime}
                          </p>
                        </div>
                        {selectedCar && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-white/60 mb-1">{t.fleet.carCatalogue}</p>
                            <p className="font-semibold">{selectedCar.name} - €{selectedCar.pricePerDay}/{t.fleet.perDay}</p>
                          </div>
                        )}
                        {!selectedCar && formData.carType && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-white/60 mb-1">{t.booking.vehicleType}</p>
                            <p className="font-semibold">{formData.carType}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="glass-card rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <User size={20} className="text-accent" />
                        {t.booking.contactInfo}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                        <div>
                          <p className="text-sm text-white/60 mb-1">{t.contact.form.name}</p>
                          <p className="font-semibold">
                            {formData.firstName} {formData.lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60 mb-1">{t.contact.form.email}</p>
                          <p className="font-semibold">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60 mb-1">{t.contact.form.phone}</p>
                          <p className="font-semibold">{formData.phone}</p>
                        </div>
                        {formData.specialRequests && (
                          <div>
                            <p className="text-sm text-white/60 mb-1">{t.booking.specialRequests}</p>
                            <p className="font-semibold">{formData.specialRequests}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-white/70 text-sm mb-1">{t.booking.rentalPeriod}</p>
                          <p className="text-white font-bold text-lg">
                            {calculateDays()} {calculateDays() === 1 ? t.booking.day : t.booking.days}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/70 text-sm mb-1">{t.booking.estimatedPrice}</p>
                          <p className="text-3xl font-black text-accent">
                            €{selectedCar 
                              ? (selectedCar.pricePerDay * calculateDays()).toFixed(2)
                              : (calculateDays() * 50).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-white/60 flex items-center gap-2">
                          <Shield size={14} />
                          {t.booking.finalPriceConfirmation}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
              {currentStep !== 'details' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all"
                >
                  <ArrowLeft size={18} />
                  {t.booking.back}
                </motion.button>
              )}
              <div className="ml-auto">
                {currentStep !== 'summary' ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={!validateStep(currentStep)}
                    className="flex items-center gap-2 px-8 py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t.booking.next}
                    <ArrowRight size={18} />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-8 py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all"
                  >
                    <MessageCircle size={18} />
                    {t.booking.bookViaWhatsApp}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

