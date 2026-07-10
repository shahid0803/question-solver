'use client';

import React from 'react';

interface OptionCardProps {
  title: string;
  description: string;
  tag: string;
}

export default function OptionCard({ title, description, tag }: OptionCardProps) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
          {tag}
        </span>
      </div>

      <p className="text-sm leading-6 text-white/60">
        {description}
      </p>
    </div>
  );
}