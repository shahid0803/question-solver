'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import CategoryTabs from './CategoryTabs';
import SubjectGrid from './SubjectGrid';

export default function PracticeLibrary() {
  return (
    <section id="practice-library" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
                Ready Practice Library
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Start solving instantly with organized exam sets.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Browse curated practice across major exams, choose a topic, and begin in seconds.
                The experience stays clean, focused, and premium.
              </p>
            </div>

            <div className="w-full max-w-xl lg:w-[32rem]">
              <SearchBar />
            </div>
          </div>

          <div className="mb-8">
            <CategoryTabs />
          </div>

          <SubjectGrid />
        </motion.div>
      </div>
    </section>
  );
}