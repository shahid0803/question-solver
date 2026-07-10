'use client';

import React from 'react';

interface InsightCardProps {
  title: string;
  description: string;
  tag: string;
}

export default function InsightCard({ title, description, tag }: InsightCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
          {tag}
        </span>
      </div>
      <p className="text-sm leading-7 text-white/60">{description}</p>
    </div>
  );
}