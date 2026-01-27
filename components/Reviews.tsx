'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { Star } from 'lucide-react';
import Link from 'next/link';

const reviews = [
  {
    name: 'John D.',
    rating: 5,
    text: 'Excellent service! The car was clean and the booking process was super fast.',
  },
  {
    name: 'Maria K.',
    rating: 5,
    text: 'Great experience at Prishtina Airport. Professional and reliable.',
  },
  {
    name: 'Arben S.',
    rating: 5,
    text: 'Best car rental in Ferizaj. Highly recommended!',
  },
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'Smooth process from booking to return. Will use again!',
  },
  {
    name: 'Driton H.',
    rating: 5,
    text: 'Perfect service for airport transfers. Very convenient.',
  },
  {
    name: 'Emma L.',
    rating: 4,
    text: 'Good cars and fair prices. Quick response on WhatsApp.',
  },
];

export function Reviews() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">{t.reviews.title}</h2>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <span className="text-accent">{t.reviews.rating}</span>
              <span className="text-white/70">{t.reviews.outOf}</span>
              <div className="flex gap-1 ml-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-accent text-accent" size={24} />
                ))}
              </div>
            </div>
          </motion.div>
          <Link
            href="/contact"
            className="px-6 py-3 glass border border-white/20 rounded-lg hover:bg-white/10 transition-all font-semibold"
          >
            VIEW ALL
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-2xl p-6 border ${
                index === 0 ? 'bg-accent/10 border-accent/50' : 'border-white/10'
              }`}
            >
              <p className="text-white/90 mb-6 leading-relaxed">{review.text}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-bold">{review.name[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-white/60">Customer</p>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`${
                      i < review.rating ? 'fill-accent text-accent' : 'text-white/20'
                    }`}
                    size={16}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

