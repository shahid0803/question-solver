'use client';

import React from 'react';

export default function SearchBar() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
        <svg
          className="h-5 w-5 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
        </svg>
        <input
          type="text"
          placeholder="Search subjects, topics, or exam names..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
      </div>
    </div>
  );
}