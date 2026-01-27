'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Sparkles, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from './LanguageProvider';

export function Footer() {
  const { t } = useLanguage();
  const socialLinks = [
    { icon: Instagram, href: '#', gradient: 'from-pink-500 to-red-500' },
    { icon: Facebook, href: '#', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Linkedin, href: '#', gradient: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#0A1929] via-[#0A1929] to-black text-white py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 bg-gradient-to-br from-accent/5 to-purple-500/5 rounded-full blur-3xl"
            animate={{
              x: [0, 150, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Animated Gradient Border at Top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section - Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pb-12 border-b border-white/10">
          {[
            { icon: Phone, label: t.footer.call, value: '+383 44 123 456', gradient: 'from-blue-500 to-cyan-500' },
            { icon: Mail, label: t.footer.email, value: 'info@rronrentacar.com', gradient: 'from-purple-500 to-pink-500' },
            { icon: MapPin, label: t.footer.location, value: t.footer.locationValue, gradient: 'from-pink-500 to-red-500' },
          ].map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-start gap-4 group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`relative w-14 h-14 bg-gradient-to-br ${contact.gradient} rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0`}
                >
                  <Icon size={24} className="text-white relative z-10" />
                  {/* Rotating Sparkles */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles
                      size={12}
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50"
                    />
                    <Sparkles
                      size={10}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-white/50"
                    />
                  </motion.div>
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 rounded-2xl"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                </motion.div>
                <div>
                  <motion.h4
                    whileHover={{ x: 4 }}
                    className="text-sm font-bold mb-2 border-b-2 border-accent inline-block pb-1 group-hover:gradient-text transition-all"
                  >
                    {contact.label}
                  </motion.h4>
                  <p className="text-white/80 group-hover:text-white transition-colors">{contact.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-4"
            >
              <Logo showText={false} size="xl" variant="light" />
            </motion.div>
            <p className="text-white/70 text-sm mt-4 leading-relaxed">
              Find your ideal car with personalized support, together.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.2, y: -5, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-2xl flex items-center justify-center shadow-xl overflow-hidden group`}
                  >
                    <Icon size={20} className="text-white relative z-10" />
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-r ${social.gradient} blur-xl opacity-0 group-hover:opacity-60 transition-opacity`}
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <motion.h4
              whileHover={{ x: 4 }}
              className="text-sm font-bold mb-4 border-b-2 border-accent inline-block pb-1 hover:gradient-text transition-all"
            >
              {t.footer.location}
            </motion.h4>
            <ul className="space-y-2 text-white/70 text-sm">
              {['Kosovo', 'Albania', 'North Macedonia'].map((location, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 8, color: '#3B82F6' }}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <ArrowRight size={14} className="text-accent" />
                  </motion.div>
                  <span>{location}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.h4
              whileHover={{ x: 4 }}
              className="text-sm font-bold mb-4 border-b-2 border-accent inline-block pb-1 hover:gradient-text transition-all"
            >
              {t.footer.quickLinks}
            </motion.h4>
            <ul className="space-y-2">
              {[
                { href: '/booking', label: t.footer.savedRides },
                { href: '/contact', label: t.footer.profile },
                { href: '/fleet', label: t.footer.postCars },
                { href: '/contact', label: t.footer.privacy },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <ArrowRight size={14} className="text-accent" />
                    </motion.div>
                    <span className="group-hover:gradient-text transition-all">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.h4
              whileHover={{ x: 4 }}
              className="text-sm font-bold mb-4 border-b-2 border-accent inline-block pb-1 hover:gradient-text transition-all"
            >
              {t.footer.resources}
            </motion.h4>
            <ul className="space-y-2">
              {[
                { href: '/fleet', label: t.footer.portfolio },
                { href: '/about', label: t.footer.blog },
                { href: '/booking', label: t.footer.pricing },
                { href: '/contact', label: t.footer.register },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <ArrowRight size={14} className="text-accent" />
                    </motion.div>
                    <span className="group-hover:gradient-text transition-all">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.h4
              whileHover={{ x: 4 }}
              className="text-sm font-bold mb-4 border-b-2 border-accent inline-block pb-1 hover:gradient-text transition-all"
            >
              {t.footer.about}
            </motion.h4>
            <ul className="space-y-2">
              {[
                { href: '/about', label: t.footer.aboutUs },
                { href: '/contact', label: t.footer.service },
                { href: '/contact', label: t.footer.faqs },
                { href: '/contact', label: t.footer.contactUs },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <ArrowRight size={14} className="text-accent" />
                    </motion.div>
                    <span className="group-hover:gradient-text transition-all">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 text-center relative"
        >
          {/* Animated Gradient Line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/50 text-sm"
          >
            {t.footer.rightsReserved}
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
