'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { LanguageToggle } from './LanguageToggle';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isFleetPage = false; // Fleet page now uses dark theme like homepage

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { t } = useLanguage();
  
  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/fleet', label: t.nav.fleet },
    { href: '/contact', label: t.nav.pages },
  ];

  // Different styles for fleet page (white background)
  const getNavbarStyles = () => {
    if (isFleetPage) {
      return scrolled
        ? 'bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-2xl'
        : 'bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg';
    }
    // Enhanced visibility with stronger shadow, border and subtle dark background for white areas
    return scrolled
      ? 'bg-gradient-to-r from-black/20 via-black/15 to-black/20 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]'
      : 'bg-gradient-to-r from-black/15 via-black/10 to-black/15 backdrop-blur-xl border border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.05)]';
  };

  const getTextColor = () => {
    if (isFleetPage) {
      return {
        active: 'text-gray-900',
        inactive: 'text-gray-600 group-hover:text-gray-900',
      };
    }
    return {
      active: 'text-white',
      inactive: 'text-white/70 group-hover:text-white',
    };
  };

  const textColors = getTextColor();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <motion.div 
          className={`relative flex items-center justify-between h-16 px-6 rounded-full transition-all duration-500 ${getNavbarStyles()}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center z-10 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Logo showText={false} size="lg" variant={isFleetPage ? "default" : "light"} />
            </motion.div>
          </Link>

          {/* Desktop Navigation - Zentriert */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2.5 rounded-full transition-all duration-300 group"
              >
                <span className={`relative z-10 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? textColors.active
                    : textColors.inactive
                }`}>
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-full backdrop-blur-sm ${
                      isFleetPage ? 'bg-purple-100' : 'bg-white/15'
                    }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {!pathname.includes(link.href) && (
                  <motion.div
                    className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isFleetPage ? 'bg-gray-100' : 'bg-white/5'
                    }`}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0 ml-auto">
            <LanguageToggle variant={isFleetPage ? "default" : "transparent"} />
            <Link href="/booking/details">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden ${
                  isFleetPage
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gradient-to-r from-accent to-accent-dark text-white shadow-lg shadow-blue-500/30'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.nav.bookNow}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageToggle variant={isFleetPage ? "default" : "transparent"} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                isFleetPage
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] backdrop-blur-2xl border-l shadow-2xl z-50 lg:hidden overflow-y-auto ${
                isFleetPage
                  ? 'bg-white border-gray-200'
                  : 'bg-white/10 border-white/20'
              }`}
            >
              <div className="p-6 space-y-6">
                {/* Mobile Logo & Close Button */}
                <div className="pb-6 border-b border-white/10 flex items-center justify-between">
                  <Logo showText={false} size="lg" variant="light" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                      isFleetPage
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                    }`}
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-full text-base font-semibold transition-all ${
                          pathname === link.href
                            ? isFleetPage
                              ? 'text-gray-900 bg-purple-100'
                              : 'text-white bg-white/15 backdrop-blur-sm'
                            : isFleetPage
                            ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Language Toggle in Mobile Menu */}
                <div className="pt-4 border-t border-white/10">
                  <div className="mb-4">
                    <p className="text-sm text-white/60 mb-2">Language</p>
                    <LanguageToggle variant="transparent" />
                  </div>
                </div>

                {/* Book Now Button */}
                <div className="pt-4 border-t border-white/10">
                  <Link href="/booking/details" onClick={() => setMobileMenuOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3.5 bg-gradient-to-r from-accent to-accent-dark text-white rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                    >
                      {t.nav.bookNow}
                      <ArrowRight size={18} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
