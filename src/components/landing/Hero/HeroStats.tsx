'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '50K+', label: 'Students' },
  { value: '1M+', label: 'Questions' },
  { value: '98%', label: 'Accuracy' },
];

export const HeroStats: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.32 }}
      className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center backdrop-blur-md"
        >
          <div className="text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default HeroStats;