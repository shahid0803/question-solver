'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const HeroContent: React.FC = () => {
  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
        AI Powered Learning Platform
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
        className="mt-6 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl"
      >
        Master Your Next Exam
        <span className="mt-3 block bg-gradient-to-r from-violet-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
          with AI & Smart Practice
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.16 }}
        className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg"
      >
        Start solving ready-made question sets instantly or generate personalized practice
        from your PDFs with AI. Learn faster with analytics, progress tracking, and focused
        revision.
      </motion.p>
    </div>
  );
};

export default HeroContent;