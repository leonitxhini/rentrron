'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Shield, Sparkles, Zap } from 'lucide-react';

type StatsKey = 'clients' | 'cars' | 'pickups';
type ValueKey = 'trust' | 'cleanliness' | 'speed';

const stats: { value: string; key: StatsKey }[] = [
  { value: '500+', key: 'clients' },
  { value: '12', key: 'cars' },
  { value: '1000+', key: 'pickups' },
];

const values: { icon: typeof Shield; key: ValueKey }[] = [
  { icon: Shield, key: 'trust' },
  { icon: Sparkles, key: 'cleanliness' },
  { icon: Zap, key: 'speed' },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <main className="relative min-h-screen">
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.about.title}</h1>
            <p className="text-xl text-white/80 leading-relaxed">{t.about.story}</p>
          </motion.div>

          {/* Stats */}
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                  className="text-5xl font-bold text-accent mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-lg text-white/70">{t.about.stats[stat.key]}</p>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-8 text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-4">
                    <Icon className="text-accent" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t.about.values[value.key]}</h3>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

