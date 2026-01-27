'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const faqs = [
    {
      question: 'RENTAL TERMS',
      answer: 'Our rental terms are designed to be flexible and customer-friendly. Minimum rental period is 24 hours, and we offer competitive rates for extended rentals. All rentals include comprehensive insurance coverage and 24/7 roadside assistance.',
    },
    {
      question: 'REQUIRED DOCUMENTS',
      answer: 'TO COMPLETE YOUR BOOKING SMOOTHLY, JUST BRING YOUR VALID DRIVER\'S LICENSE, PASSPORT OR ID, AND A PAYMENT CARD.',
    },
    {
      question: 'DEPOSIT, FUEL, INSURANCE',
      answer: 'A security deposit is required at the time of pickup. The amount varies by vehicle type. Fuel policy is full-to-full. Comprehensive insurance is included in all rentals, with optional premium coverage available.',
    },
    {
      question: 'EXTRAS & CONDITIONS',
      answer: 'We offer various extras including GPS navigation, child seats, additional drivers, and premium insurance. All extras must be requested at booking time. Terms and conditions apply to all rentals.',
    },
  ];

  return (
    <section className="bg-white py-32">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black text-black mb-16"
        >
          COMMON QUESTIONS
        </motion.h2>

        <div className="max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <span className="text-xl font-bold text-black uppercase">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pt-2">
                      <p className="text-gray-600 leading-relaxed bg-black text-white p-6">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-800 transition-all"
            >
              LEARN MORE
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

