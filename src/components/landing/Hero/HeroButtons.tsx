'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const HeroButtons: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.24 }}
      className="mt-8 flex flex-col gap-4 sm:flex-row"
    >
      <Link
        href="/dashboard"
        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(109,93,246,0.35)] transition-transform duration-200 hover:scale-[1.02]"
      >
        Start Solving
      </Link>

      <Link
        href="/upload"
        className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-6 py-4 text-sm font-semibold text-white/90 backdrop-blur-md transition-colors hover:bg-white/10"
      >
        Generate from PDF
      </Link>
    </motion.div>
  );
};

export default HeroButtons;