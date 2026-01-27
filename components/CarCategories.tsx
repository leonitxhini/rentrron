'use client';

import { motion } from 'framer-motion';
import { Car, Truck, Zap, Crown, Users, Sparkles } from 'lucide-react';

const categories = [
  { icon: Users, label: 'Minivan', value: 'minivan' },
  { icon: Zap, label: 'Sports car', value: 'sports', active: true },
  { icon: Truck, label: 'SUV', value: 'suv' },
  { icon: Car, label: 'Sedan', value: 'sedan' },
  { icon: Sparkles, label: 'Hatchback', value: 'hatchback' },
  { icon: Crown, label: 'Luxury car', value: 'luxury' },
];

export function CarCategories({ onCategoryChange }: { onCategoryChange?: (category: string) => void }) {
  return (
    <div className="space-y-3">
      {categories.map((category, index) => {
        const Icon = category.icon;
        return (
          <motion.button
            key={category.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onCategoryChange?.(category.value)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
              category.active
                ? 'bg-accent/10 border border-accent text-accent'
                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-accent/10 hover:text-accent hover:border-accent/50'
            }`}
          >
            <Icon size={24} className={category.active ? 'text-accent' : 'text-white/70'} />
            <span className="font-medium">{category.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

