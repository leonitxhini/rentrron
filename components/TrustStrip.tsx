'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { Clock, Plane, Sparkles, Zap } from 'lucide-react';

const trustItems = [
  { icon: Clock, key: 'support' },
  { icon: Plane, key: 'airport' },
  { icon: Sparkles, key: 'clean' },
  { icon: Zap, key: 'fast' },
] as const;

export function TrustStrip() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center border border-white/5 hover:border-accent/50 transition-all"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 mb-6 border border-accent/30">
                  <Icon className="text-accent" size={36} />
                </div>
                <p className="text-xl font-bold">{t.trust[item.key]}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

