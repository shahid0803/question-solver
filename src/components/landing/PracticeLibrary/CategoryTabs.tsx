'use client';

import React from 'react';

const categories = ['All', 'GATE', 'UPSC', 'CAT', 'IIT JAM', 'NET-JRF', 'SSC'];

export default function CategoryTabs() {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category, index) => (
        <button
          key={category}
          className={[
            'rounded-full border px-4 py-2 text-sm font-medium transition',
            index === 0
              ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
              : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white',
          ].join(' ')}
        >
          {category}
        </button>
      ))}
    </div>
  );
}