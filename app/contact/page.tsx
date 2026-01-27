'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { Phone, MessageCircle, Instagram, MapPin } from 'lucide-react';
import { generateContactMessage, generateWhatsAppMessage } from '@/lib/whatsapp';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappUrl = generateContactMessage(formData.name, formData.message, language);
    window.open(whatsappUrl, '_blank');
  };

  const contactMethods = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: '+383 49 123 456',
      action: () => window.open('tel:+38349123456', '_self'),
    },
    {
      icon: MessageCircle,
      label: t.contact.whatsapp,
      value: '+383 49 123 456',
      action: () => {
        const url = generateWhatsAppMessage({
          car: t.quickBooking.carTypes.all,
          fromDate: 'TBD',
          toDate: 'TBD',
          location: t.quickBooking.locations.ferizaj,
          lang: language,
        });
        window.open(url, '_blank');
      },
    },
    {
      icon: Instagram,
      label: t.contact.instagram,
      value: '@rronrentacar',
      action: () => window.open('https://instagram.com/rronrentacar', '_blank'),
    },
  ];

  const locations = [
    { name: 'Ferizaj', address: 'Main Street, Ferizaj' },
    { name: t.quickBooking.locations.prishtina, address: 'Prishtina International Airport' },
    { name: t.quickBooking.locations.skopje, address: 'Skopje International Airport' },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contact.title}</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Cards */}
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={method.action}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <Icon className="text-accent" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-white/70 mb-1">{method.label}</p>
                      <p className="font-semibold">{method.value}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <MapPin className="text-accent" size={28} />
              {t.contact.locations}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {locations.map((location) => (
                <div key={location.name} className="p-4 bg-white/5 rounded-lg">
                  <p className="font-semibold mb-1">{location.name}</p>
                  <p className="text-sm text-white/70">{location.address}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">{t.contact.sendMessage}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.contact.form.name}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.contact.form.email}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.contact.form.phone}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.contact.form.message}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent resize-none"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent-light transition-all"
              >
                {t.contact.form.send}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

