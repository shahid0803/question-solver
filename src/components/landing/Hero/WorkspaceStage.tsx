'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const floatingPanels = [
  {
    title: 'Question Library',
    subtitle: '1,250 organized questions',
    detail: 'GATE • UPSC • CAT',
    x: -210,
    y: -90,
    rotate: -10,
    accent: 'from-violet-500 to-fuchsia-500',
  },
  {
    title: 'Notes Workspace',
    subtitle: 'Handwritten • PDFs • Book pages',
    detail: 'Extracted points + revision',
    x: 225,
    y: -10,
    rotate: 11,
    accent: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Exam Mode',
    subtitle: 'Timer • Review • Explanation',
    detail: 'Serious mock test flow',
    x: -165,
    y: 220,
    rotate: 7,
    accent: 'from-orange-500 to-pink-500',
  },
];

function FloatingPanel({
  title,
  subtitle,
  detail,
  accent,
  x,
  y,
  rotate,
  delay,
}: {
  title: string;
  subtitle: string;
  detail: string;
  accent: string;
  x: number;
  y: number;
  rotate: number;
  delay: number;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 z-30 w-[230px] transform-gpu will-change-transform"
      style={{
        transform: `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: 1,
          y: [0, -10, 0],
          rotate: [rotate, rotate + 1.5, rotate],
        }}
        transition={{
          opacity: { duration: 0.6, delay },
          y: {
            duration: 6 + delay,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: 7 + delay,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="transform-gpu will-change-transform"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
          <div className={`h-1.5 rounded-full bg-gradient-to-r ${accent}`} />
          <div className="mt-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">
              {title}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">{subtitle}</h3>
            <p className="mt-2 text-sm leading-6 text-white/55">{detail}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WorkspaceStage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
  };

  const glowX = 50 + mouse.x * 18;
  const glowY = 50 + mouse.y * 18;

  return (
    <div
      className="relative mx-auto h-[680px] w-full max-w-[760px] overflow-visible transform-gpu will-change-transform sm:h-[720px]"
      style={{
        perspective: '1800px',
        transform: `translate3d(${mouse.x * 10}px, ${mouse.y * 8}px, 0)`,
        transition: 'transform 180ms ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 rounded-[48px] bg-[radial-gradient(circle_at_50%_20%,rgba(109,93,246,0.22),transparent_32%),radial-gradient(circle_at_18%_80%,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(251,146,60,0.12),transparent_24%)] blur-3xl transform-gpu will-change-transform" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[48px] opacity-90 transform-gpu will-change-transform"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(34,211,238,0.16), transparent 28%), radial-gradient(circle at ${100 - glowX}% ${100 - glowY}%, rgba(109,93,246,0.12), transparent 34%)`,
          transition: 'background 160ms linear',
        }}
      />

      {floatingPanels.map((panel, index) => (
        <FloatingPanel key={panel.title} {...panel} delay={index * 0.18} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: [0, -10, 0],
          rotateY: [-6, 6, -6],
          rotateX: [2, -2, 2],
          scale: [1, 1.01, 1],
        }}
        transition={{
          opacity: { duration: 0.9, ease: 'easeOut', delay: 0.08 },
          y: {
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotateY: {
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotateX: {
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          scale: {
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="absolute inset-0 z-20 rounded-[48px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-[28px] transform-gpu will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative h-full overflow-hidden rounded-[38px] border border-white/10 bg-[#09101d]/92 p-5 transform-gpu will-change-transform">
          <motion.div
            aria-hidden="true"
            animate={{ x: ['-120%', '120%'] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute inset-y-0 left-0 w-[35%] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)] transform-gpu will-change-transform"
          />

          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                  Study Workspace
                </p>
                <p className="mt-1 text-sm text-white/45">
                  A focused space for practice, notes, and exam mode
                </p>
              </div>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65">
              Workspace Ready
            </div>
          </div>

          <div className="grid h-[calc(100%-4.5rem)] gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-white/40">
                    Mock Test Preview
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Operating Systems
                  </h3>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75">
                  00:43:12
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#0b1220] p-5">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
                  Question 12
                </p>

                <h4 className="mt-4 max-w-2xl text-xl font-semibold leading-8 text-white sm:text-2xl">
                  Which scheduling algorithm minimizes the average waiting time?
                </h4>

                <div className="mt-6 space-y-3">
                  {[
                    { id: 'A', label: 'FCFS', active: false },
                    { id: 'B', label: 'Round Robin', active: false },
                    { id: 'C', label: 'SJF', active: true },
                    { id: 'D', label: 'Priority Scheduling', active: false },
                  ].map((option) => (
                    <button
                      key={option.id}
                      className={[
                        'flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition duration-200 transform-gpu will-change-transform',
                        option.active
                          ? 'border-cyan-400/35 bg-cyan-400/10 text-cyan-100'
                          : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transform-gpu will-change-transform',
                          option.active
                            ? 'border-cyan-400/40 bg-cyan-400/15 text-cyan-200'
                            : 'border-white/10 bg-black/20 text-white/70',
                        ].join(' ')}
                      >
                        {option.id}
                      </span>
                      <span className="text-base font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_280px]">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm uppercase tracking-[0.22em] text-white/40">
                      Explanation after submit
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/65">
                      Shortest Job First chooses the process with the smallest burst time first,
                      which typically reduces average waiting time.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm uppercase tracking-[0.22em] text-white/40">Result</p>
                    <p className="mt-3 text-lg font-semibold text-emerald-300">Correct Answer</p>
                    <p className="mt-2 text-sm text-white/60">SJF</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 transform-gpu will-change-transform">
                  Previous
                </button>

                <div className="flex flex-wrap gap-3">
                  <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 transform-gpu will-change-transform">
                    Mark for Review
                  </button>
                  <button className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(109,93,246,0.28)] transition hover:scale-[1.02] transform-gpu will-change-transform">
                    Save &amp; Next
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 transform-gpu will-change-transform">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                  Notes Workspace
                </p>
                <h4 className="mt-3 text-xl font-semibold text-white">
                  Handwritten notes, PDFs, and book pages.
                </h4>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Handwritten Notes', 'PDFs', 'Book Pages', 'Images'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 transform-gpu will-change-transform"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 transform-gpu will-change-transform">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                  Performance Snapshot
                </p>

                <div className="mt-4 space-y-4">
                  {[
                    { label: 'Accuracy', value: '87%' },
                    { label: 'Speed', value: '42 sec' },
                    { label: 'Attempt Rate', value: '96%' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-white/60">{item.label}</span>
                        <span className="text-white">{item.value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-orange-400 transform-gpu will-change-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 transform-gpu will-change-transform">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                  Quick Actions
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {['Create Practice Set', 'Start Exam Mode', 'Review Mistakes'].map((item) => (
                    <span
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transform-gpu will-change-transform"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}