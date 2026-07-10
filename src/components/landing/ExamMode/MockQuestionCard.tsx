'use client';

import React from 'react';

const options = [
  { id: 'A', label: 'FCFS' },
  { id: 'B', label: 'Round Robin' },
  { id: 'C', label: 'SJF' },
  { id: 'D', label: 'Priority Scheduling' },
];

export default function MockQuestionCard() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl sm:p-6 lg:p-7">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Exam Mode Preview</p>
          <h3 className="mt-2 text-2xl font-bold text-white">Operating Systems</h3>
        </div>

        <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm font-semibold text-white/80">
          00:43:12
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-white/10 bg-[#0b1220] p-5 sm:p-6">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
          Question 12
        </p>

        <h4 className="mt-4 max-w-2xl text-xl font-semibold leading-8 text-white sm:text-2xl">
          Which scheduling algorithm minimizes the average waiting time?
        </h4>

        <div className="mt-6 space-y-3">
          {options.map((option) => (
            <button
              key={option.id}
              className={[
                'flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition duration-200',
                option.id === 'C'
                  ? 'border-cyan-400/35 bg-cyan-400/10 text-cyan-100'
                  : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold',
                  option.id === 'C'
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
            <p className="text-sm uppercase tracking-[0.22em] text-white/40">Explanation after submit</p>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Shortest Job First chooses the process with the smallest burst time first, which typically
              reduces average waiting time.
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
        <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10">
          Previous
        </button>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10">
            Mark for Review
          </button>
          <button className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(109,93,246,0.28)] transition hover:scale-[1.02]">
            Save &amp; Next
          </button>
        </div>
      </div>
    </div>
  );
}