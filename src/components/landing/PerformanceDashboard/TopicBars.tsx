'use client';

import React from 'react';

interface TopicBarsProps {
  topics: Array<{
    label: string;
    score: number;
    tone: 'good' | 'medium' | 'weak';
  }>;
}

export default function TopicBars({ topics }: TopicBarsProps) {
  return (
    <div className="space-y-4">
      {topics.map((topic) => {
        const barClass =
          topic.tone === 'good'
            ? 'from-emerald-400 to-cyan-400'
            : topic.tone === 'medium'
              ? 'from-amber-400 to-orange-400'
              : 'from-rose-400 to-pink-500';

        return (
          <div key={topic.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-white">{topic.label}</p>
              <span className="text-sm text-white/55">{topic.score}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${barClass}`}
                style={{ width: `${topic.score}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}