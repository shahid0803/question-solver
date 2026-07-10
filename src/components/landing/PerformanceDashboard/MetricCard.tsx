'use client';

import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
}

export default function MetricCard({ label, value, trend }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/8">
      <p className="text-sm uppercase tracking-[0.24em] text-white/40">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        {trend ? (
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            {trend}
          </span>
        ) : null}
      </div>
    </div>
  );
}