'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Gauge, Plane, Headphones, Sparkles, ArrowRight } from 'lucide-react';

export function AboutUsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Gauge,
      title: 'Unlimited Kilometer',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Plane,
      title: 'Pickup & Drop Service',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Headphones,
      title: '24/7 Customer Support',
      gradient: 'from-pink-500 to-red-500',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-32 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 bg-gradient-to-br from-accent/5 to-purple-500/5 rounded-full blur-3xl"
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-black mb-4 relative">
              <span>About</span>
              <br />
              <span className="gradient-text">Us</span>
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent via-purple-500 to-pink-500 blur-3xl opacity-20"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Experience the new standard of quality with RRON Rent A Car. Discover why we're the trusted choice for Car and achieve your goals with confidence.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Car Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative w-full h-[500px] rounded-3xl overflow-hidden group"
            style={{ perspective: '1000px' }}
          >
            {/* Glow behind image */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent via-purple-500 to-pink-500 blur-3xl opacity-20"
              animate={{
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200"
              alt="SUV"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/60 via-transparent to-transparent" />
            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-black text-black uppercase gradient-text"
            >
              RRON CAR RENTAL
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-lg leading-relaxed flex items-center gap-2 group/link"
            >
              Follow us for more
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} className="text-accent" />
              </motion.div>
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text and Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-black text-black"
            >
              Luxury car rental <span className="gradient-text">RRON</span>
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative bg-gray-50 rounded-2xl p-8 border-l-4 border-accent border border-gray-200"
            >
              <p className="text-gray-600 leading-relaxed text-lg">
                At RRON, we offer reliable premium selection of luxury vehicles. Whether for business, leisure, or special occasions, our diverse and exceptional service ensure a smooth, stylish ride every time.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-6 pt-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const mouseX = useMotionValue(0);
                const mouseY = useMotionValue(0);
                
                const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
                const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    onMouseMove={(e) => {
                      if (containerRef.current) {
                        const rect = containerRef.current.getBoundingClientRect();
                        const centerX = rect.left + rect.width / 2;
                        const centerY = rect.top + rect.height / 2;
                        mouseX.set((e.clientX - centerX) / 1000);
                        mouseY.set((e.clientY - centerY) / 1000);
                      }
                    }}
                    style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="text-center group relative"
                  >
                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                      animate={{
                        opacity: hoveredIndex === index ? 0.4 : 0,
                      }}
                    />

                    {/* Icon Container */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className={`relative w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl z-10`}
                    >
                      <Icon size={40} className="text-white relative z-10" />
                      
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
                          size={16}
                          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50"
                        />
                        <Sparkles
                          size={14}
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-white/50"
                        />
                        <Sparkles
                          size={12}
                          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white/50"
                        />
                        <Sparkles
                          size={15}
                          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-white/50"
                        />
                      </motion.div>

                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 rounded-2xl"
                        animate={{
                          x: hoveredIndex === index ? ['-200%', '200%'] : '-200%',
                        }}
                        transition={{
                          duration: 1,
                          repeat: hoveredIndex === index ? Infinity : 0,
                          repeatDelay: 1.5,
                        }}
                      />
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="text-sm font-bold text-black group-hover:gradient-text transition-all duration-300"
                    >
                      {feature.title}
                    </motion.p>

                    {/* Floating Particles on Hover */}
                    {hoveredIndex === index && (
                      <>
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1.5 h-1.5 bg-gradient-to-r ${feature.gradient} rounded-full`}
                            initial={{
                              x: '50%',
                              y: '50%',
                              scale: 0,
                              opacity: 1,
                            }}
                            animate={{
                              x: `${50 + (Math.random() - 0.5) * 150}%`,
                              y: `${50 + (Math.random() - 0.5) * 150}%`,
                              scale: [0, 1.5, 0],
                              opacity: [1, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Car Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative w-full h-[400px] rounded-3xl overflow-hidden group"
            style={{ perspective: '1000px' }}
          >
            {/* Glow behind image */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent via-purple-500 to-pink-500 blur-3xl opacity-20"
              animate={{
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200"
              alt="Luxury Car"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/60 via-transparent to-transparent" />
            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
