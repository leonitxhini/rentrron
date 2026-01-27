'use client';

import { motion } from 'framer-motion';

export function StatsSection() {
  const stats = [
    { number: '98%', label: 'REPEAT BOOKINGS' },
    { number: '5+', label: 'YEARS OF EXPERIENCE' },
    { number: '0', label: 'HIDDEN FEES' },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-6xl md:text-7xl font-black text-black mb-4">
                {stat.number}
              </h3>
              <p className="text-gray-600 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

