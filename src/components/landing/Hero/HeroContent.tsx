'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">
        ✨ Smart Exam Preparation
      </div>

      <h1 className="mt-8 text-5xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl xl:text-8xl">
        Master Every
        <br />
        <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
          Competitive Exam
        </span>
        <br />
        with Smart Practice
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
        Practice organized question banks or transform handwritten notes, PDFs, and book pages into
        mock tests, revision sheets, flashcards, and exam-style sessions.
      </p>
    </motion.div>
  );
}