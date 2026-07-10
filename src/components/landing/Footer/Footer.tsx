'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Practice Library', href: '#practice-library' },
      { label: 'Study Workspace', href: '#study-workspace' },
      { label: 'Exam Mode', href: '#exam-mode' },
      { label: 'Performance Insights', href: '#performance-dashboard' },
    ],
  },
  {
    title: 'Exams',
    links: [
      { label: 'GATE', href: '#practice-library' },
      { label: 'UPSC', href: '#practice-library' },
      { label: 'CAT', href: '#practice-library' },
      { label: 'NET-JRF', href: '#practice-library' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Get Started', href: '#final-cta' },
      { label: 'Login', href: '/login' },
      { label: 'Sign Up', href: '/signup' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">
                Built for serious aspirants
              </div>

              <h2 className="mt-6 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                A premium workspace for practice, revision, and exam simulation.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Explore organized question banks, create your own study workspace from uploaded
                material, and train in a realistic exam-style interface.
              </p>

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

            <div className="grid gap-6 sm:grid-cols-3">
              {columns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                    {column.title}
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/60 transition hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/45">
              © {year} Question Solver. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-white/55">
              <Link href="#" className="transition hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="transition hover:text-white">
                Terms
              </Link>
              <Link href="#" className="transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}