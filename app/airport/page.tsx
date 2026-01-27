'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { Plane, ChevronDown } from 'lucide-react';
import { BookingModal } from '@/components/BookingModal';

const faqs = [
  {
    q: 'How do I book an airport transfer?',
    a: 'Simply choose your car, send us a message via WhatsApp with your flight details, and we will confirm your booking.',
  },
  {
    q: 'Do you meet at the airport?',
    a: 'Yes, we provide meet & greet service at both Prishtina and Skopje airports.',
  },
  {
    q: 'What if my flight is delayed?',
    a: 'We track your flight and adjust pickup time accordingly. No extra charges for delays.',
  },
  {
    q: 'Can I book for late-night arrivals?',
    a: 'Yes, we operate 24/7 and can accommodate late-night pickups.',
  },
];

export default function AirportPage() {
  const { t } = useLanguage();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const services = [
    {
      airport: 'prishtina',
      title: t.airport.prishtina.title,
      description: t.airport.prishtina.description,
      steps: [
        t.airport.prishtina.steps.step1,
        t.airport.prishtina.steps.step2,
        t.airport.prishtina.steps.step3,
        t.airport.prishtina.steps.step4,
      ],
    },
    {
      airport: 'skopje',
      title: t.airport.skopje.title,
      description: t.airport.skopje.description,
      steps: [
        t.airport.skopje.steps.step1,
        t.airport.skopje.steps.step2,
        t.airport.skopje.steps.step3,
        t.airport.skopje.steps.step4,
      ],
    },
  ];

  return (
    <main className="relative min-h-screen">
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.airport.title}</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.airport}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    <Plane className="text-accent" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold">{service.title}</h2>
                </div>

                <p className="text-white/70 mb-6">{service.description}</p>

                <div className="space-y-3 mb-6">
                  {service.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-white font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </div>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent-light transition-all"
                >
                  {t.airport.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">{t.airport.faq}</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4 last:border-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span className="font-semibold">{faq.q}</span>
                    <ChevronDown
                      className={`transition-transform flex-shrink-0 ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 text-white/70"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </main>
  );
}

