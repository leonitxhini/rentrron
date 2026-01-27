'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { Plane, Check } from 'lucide-react';
import Link from 'next/link';

export function AirportServices() {
  const { t } = useLanguage();

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
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6" style={{ letterSpacing: '-0.02em' }}>
            {t.airport.title}
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Professional airport transfer services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.airport}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass rounded-3xl p-10 border border-white/5 hover:border-accent/50 transition-all"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <Plane className="text-accent" size={40} />
                </div>
                <h3 className="text-3xl font-black">{service.title}</h3>
              </div>

              <p className="text-white/70 mb-6">{service.description}</p>

              <ul className="space-y-3 mb-6">
                {service.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-center gap-3">
                    <Check className="text-accent flex-shrink-0" size={20} />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/airport"
                className="inline-block px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent-light transition-all"
              >
                {t.airport.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

