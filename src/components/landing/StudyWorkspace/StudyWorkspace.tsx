'use client';

import React from 'react';
import { motion } from 'framer-motion';
import OptionGrid from './OptionGrid';

export default function StudyWorkspace() {
  return (
    <section id="study-workspace" className="relative px-4 py-24 sm:px-6 lg:px-8">
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
                Smart Study Workspace
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Upload anything and choose what you want to create.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                PDFs, handwritten notes, book pages, or screenshots can become practice questions,
                mock tests, revision sheets, flashcards, and important points.
              </p>
            </div>

            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-black/20 p-5 text-sm text-white/70">
              <p className="text-white font-medium">Supported Inputs</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['PDF', 'Handwritten Notes', 'Images', 'Book Pages', 'PYQs'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <OptionGrid />
        </motion.div>
      </div>
    </section>
  );
}