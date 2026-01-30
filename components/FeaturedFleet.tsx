'use client';

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { CarCard } from './CarCard';
import { cars } from '@/data/cars';
import { useState, useRef, useEffect } from 'react';
import { BookingModal } from './BookingModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function FeaturedFleet() {
  const { t } = useLanguage();
  const allCars = cars;
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleQuickBook = (carName: string) => {
    setSelectedCar(carName);
    setBookingModalOpen(true);
  };

  // Calculate visible cards based on screen size
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, allCars.length - visibleCards);

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < maxIndex);
  }, [currentIndex, maxIndex]);

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold && currentIndex > 0) {
      scrollLeft();
    } else if (info.offset.x < -threshold && currentIndex < maxIndex) {
      scrollRight();
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            {t.fleet.featured}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t.ourCars?.subtitle || 'Explore our premium fleet. From sports cars to family SUVs, find the perfect vehicle for your needs.'}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:bg-white/20 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex ${
              !canScrollLeft ? 'opacity-30' : ''
            }`}
            aria-label="Previous cars"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:bg-white/20 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex ${
              !canScrollRight ? 'opacity-30' : ''
            }`}
            aria-label="Next cars"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={carouselRef}>
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{
                x: `-${currentIndex * (100 / visibleCards)}%`,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="flex gap-6 cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'pan-x' }}
            >
              {allCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex-shrink-0"
                  style={{
                    width: `calc((100% - ${(visibleCards - 1) * 24}px) / ${visibleCards})`,
                  }}
                >
                  <CarCard
                    car={car}
                    onQuickBook={() => handleQuickBook(car.name)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(allCars.length / visibleCards) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex) === index
                    ? 'bg-accent w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Car Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-white/60">
              {currentIndex * visibleCards + 1} - {Math.min((currentIndex + 1) * visibleCards, allCars.length)} of {allCars.length}
            </span>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setSelectedCar('');
        }}
        carName={selectedCar}
      />
    </section>
  );
}

