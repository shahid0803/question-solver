'use client';

import React from 'react';

interface PracticeCardProps {
  title: string;
  questionCount: string;
  difficulty: string;
  exams: string[];
}

export default function PracticeCard({
  title,
  questionCount,
  difficulty,
  exams,
}: PracticeCardProps) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-white/50">{questionCount} questions</p>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          {difficulty}
        </div>
      </div>

      <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-white/8">
        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-orange-400" />
      </div>

      <div className="flex flex-wrap gap-2">
        {exams.map((exam) => (
          <span
            key={exam}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/60"
          >
            {exam}
          </span>
        ))}
      </div>
    </div>
  );
}