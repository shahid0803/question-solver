'use client';

import React from 'react';
import { motion } from 'framer-motion';
import QuestionNavigator from './QuestionNavigator';
import MockQuestionCard from './MockQuestionCard';

export default function ExamMode() {
  return (
    <section id="exam-mode" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
                Exam Mode
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Practice in a real exam-style environment.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Full-screen timing, review mode, answer tracking, and detailed explanations make every
                mock test feel structured and serious.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white/70">
              <p className="font-medium text-white">Mode Features</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Timer', 'Review', 'Auto Save', 'Navigation', 'Explanation'].map((item) => (
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

          <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
            <QuestionNavigator />
            <MockQuestionCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}