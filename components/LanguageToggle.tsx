'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';

interface LanguageToggleProps {
  variant?: 'default' | 'transparent';
}

export function LanguageToggle({ variant = 'default' }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();
  const isTransparent = variant === 'transparent';

  return (
    <div className={`flex items-center gap-2 rounded-full px-2 py-1 ${
      isTransparent ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-100'
    }`}>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-accent text-white font-bold shadow-sm'
            : isTransparent
            ? 'text-white/80 hover:text-white'
            : 'text-gray-600 hover:text-accent'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('sq')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'sq'
            ? 'bg-accent text-white font-bold shadow-sm'
            : isTransparent
            ? 'text-white/80 hover:text-white'
            : 'text-gray-600 hover:text-accent'
        }`}
      >
        SQ
      </button>
    </div>
  );
}

