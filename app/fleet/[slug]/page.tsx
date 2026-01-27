'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { getCarBySlug } from '@/data/cars';
import { BookingModal } from '@/components/BookingModal';
import { generateWhatsAppMessage } from '@/lib/whatsapp';
import { ChevronDown, Check } from 'lucide-react';

export default function CarDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { t, language } = useLanguage();
  const [car, setCar] = useState(getCarBySlug(slug));
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const foundCar = getCarBySlug(slug);
    setCar(foundCar);
  }, [slug]);

  if (!car) {
    return null; // Will be handled by not-found
  }

  const handleBook = () => {
    const message = generateWhatsAppMessage({
      car: car.name,
      fromDate: 'TBD',
      toDate: 'TBD',
      location: car.locationAvailability[0],
      lang: language,
    });
    window.open(message, '_blank');
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <main className="relative min-h-screen">
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="glass rounded-2xl overflow-hidden">
                <div className="relative h-96 md:h-[500px]">
                  <Image
                    src={car.images[selectedImage] || car.images[0] || 'https://via.placeholder.com/800'}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {car.images.length > 1 && (
                  <div className="p-4 grid grid-cols-4 gap-2">
                    {car.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? 'border-accent' : 'border-transparent'
                        }`}
                      >
                        <Image src={img} alt={`${car.name} ${index + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Specs */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">{t.carDetails.specs}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white/70 text-sm mb-1">{t.carDetails.transmission}</p>
                    <p className="font-semibold">{car.transmission}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-1">{t.carDetails.fuel}</p>
                    <p className="font-semibold">{car.fuel}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-1">{t.carDetails.seats}</p>
                    <p className="font-semibold">{car.seats}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-1">{t.carDetails.horsepower}</p>
                    <p className="font-semibold">{car.horsepower} HP</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-1">{t.carDetails.ac}</p>
                    <p className="font-semibold">{car.ac ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-1">Available at</p>
                    <p className="font-semibold text-sm">{car.locationAvailability.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Policy Accordion */}
              <div className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleSection('policy')}
                  className="w-full p-6 flex justify-between items-center text-left"
                >
                  <h2 className="text-2xl font-bold">{t.carDetails.policy}</h2>
                  <ChevronDown
                    className={`transition-transform ${expandedSection === 'policy' ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedSection === 'policy' && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="px-6 pb-6 space-y-4"
                  >
                    <div>
                      <p className="font-semibold mb-1">{t.carDetails.deposit}</p>
                      <p className="text-white/70">€200 - €500 (refundable)</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{t.carDetails.insurance}</p>
                      <p className="text-white/70">Full coverage included</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{t.carDetails.mileage}</p>
                      <p className="text-white/70">Unlimited</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{t.carDetails.fuelPolicy}</p>
                      <p className="text-white/70">Return with same level</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Included Services */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">{t.carDetails.included}</h2>
                <div className="space-y-2">
                  {['24/7 Support', 'Airport Delivery', 'Free Cancellation', 'GPS Navigation'].map(
                    (service) => (
                      <div key={service} className="flex items-center gap-3">
                        <Check className="text-accent flex-shrink-0" size={20} />
                        <span>{service}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Booking Card */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="glass-strong rounded-2xl p-6">
                <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
                <p className="text-4xl font-bold text-accent mb-6">
                  €{car.pricePerDay}
                  <span className="text-lg text-white/70">/{t.fleet.perDay.replace('/', '')}</span>
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full px-6 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent-light transition-all mb-4"
                >
                  {t.carDetails.bookNow}
                </motion.button>

                <button
                  onClick={handleBook}
                  className="w-full px-6 py-4 glass border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                >
                  {t.hero.bookWhatsApp}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-strong border-t border-white/10 p-4 z-40">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setBookingModalOpen(true)}
          className="w-full px-6 py-4 bg-accent text-white font-bold rounded-lg"
        >
          {t.carDetails.bookNow}
        </motion.button>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        carName={car.name}
      />
    </main>
  );
}

