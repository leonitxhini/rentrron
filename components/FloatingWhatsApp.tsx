'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { generateWhatsAppMessage } from '@/lib/whatsapp';

export function FloatingWhatsApp() {
  const { t, language } = useLanguage();

  const handleClick = () => {
    const message = generateWhatsAppMessage({
      car: t.quickBooking.carTypes.all,
      fromDate: 'TBD',
      toDate: 'TBD',
      location: t.quickBooking.locations.ferizaj,
      lang: language,
    });
    window.open(message, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-[#25D366]/50 transition-all"
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.button>
  );
}

