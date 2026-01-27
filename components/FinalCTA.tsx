'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { MessageCircle, Phone } from 'lucide-react';
import { generateWhatsAppMessage } from '@/lib/whatsapp';

export function FinalCTA() {
  const { t, language } = useLanguage();

  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage({
      car: t.quickBooking.carTypes.all,
      fromDate: 'TBD',
      toDate: 'TBD',
      location: t.quickBooking.locations.ferizaj,
      lang: language,
    });
    window.open(message, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+38349123456', '_self');
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.cta.title}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-full flex items-center justify-center gap-3 hover:bg-[#20BA5A] transition-all"
            >
              <MessageCircle size={24} />
              {t.cta.whatsApp}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCall}
              className="px-8 py-4 glass border-2 border-accent text-white font-bold rounded-full flex items-center justify-center gap-3 hover:bg-accent/10 transition-all"
            >
              <Phone size={24} />
              {t.cta.call}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

