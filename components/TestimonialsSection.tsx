'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const testimonials = [
  {
    name: 'ANNA KOVALENKO',
    text: 'The rental experience was flawless — the car was immaculate, the service exceptional, and the whole process seamless. Highly recommend for anyone looking for luxury and reliability',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    name: 'JOHN SMITH',
    text: 'Outstanding service from start to finish. The car exceeded expectations and the team was incredibly professional.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    name: 'MARIA GARCIA',
    text: 'Perfect for our family vacation. Clean, reliable, and the booking process was so easy.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  },
  {
    name: 'DAVID CHEN',
    text: 'Best car rental experience I\'ve had. The premium vehicles and excellent customer service made our trip unforgettable.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="bg-black py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black text-white uppercase"
          >
            WHAT OUR
            <br />
            CLIENTS SAY
          </motion.h2>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-32 h-32 rounded-full border-2 border-white text-white flex flex-col items-center justify-center hover:bg-white hover:text-black transition-all"
            >
              <span className="text-xs font-bold mb-1">LEARN</span>
              <span className="text-xs font-bold mb-1">MORE</span>
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          {/* Background Layer */}
          <div className="absolute inset-0 bg-gray-800 rounded-3xl transform translate-x-4 translate-y-4" />
          
          {/* Main Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-black uppercase">
                  {testimonials[currentIndex].name}
                </h3>
              </div>
            </div>
            <p className="text-black leading-relaxed mb-6 text-lg">
              {testimonials[currentIndex].text}
            </p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-black text-black" size={24} />
              ))}
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex flex-col gap-3 absolute right-0 top-1/2 -translate-y-1/2 translate-x-16">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white'
                    : 'bg-white/30 border border-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/80 text-sm uppercase tracking-wider"
          >
            JOIN 10,000+ SATISFIED RENTERS
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/80 text-sm uppercase tracking-wider text-right"
          >
            WE VALUE YOUR OPINION — IT HELPS US GROW AND SERVE YOU BETTER
          </motion.p>
        </div>
      </div>
    </section>
  );
}

