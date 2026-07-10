'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const highlights = [
  {
    title: 'Ready Question Bank',
    description: 'Browse organized practice sets across major exams and subjects.',
  },
  {
    title: 'Study Workspace',
    description: 'Turn PDFs, notes, and images into practice, revision, and mock tests.',
  },
  {
    title: 'Exam Mode',
    description: 'Practice in a real exam-style interface with timer and review flow.',
  },
];

export default function FinalCTA() {
  return (
    <section id="final-cta" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl"
        >
          <div className="grid gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-14">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
                Ready to start
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-6xl">
                Build your next study session in seconds.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Explore curated practice sets, open the study workspace, or switch into exam mode when
                you want a realistic test experience.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#practice-library"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(109,93,246,0.28)] transition hover:scale-[1.02]"
                >
                  Explore Question Bank
                </Link>

                <Link
                  href="#study-workspace"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:bg-white/10"
                >
                  Open Study Workspace
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {['GATE', 'UPSC', 'CAT', 'IIT JAM', 'NET-JRF', 'SSC', 'Banking'].map((exam) => (
                  <span
                    key={exam}
                    className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/65"
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-xl"
                >
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">{item.description}</p>
                </div>
              ))}

              <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/75">
                  One platform
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Practice, revise, test, and improve in one clean workspace.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}