'use client';

import Link from 'next/link';

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <Link
        href="#practice-library"
        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-2xl transition hover:-translate-y-0.5 hover:scale-[1.01]"
      >
        Explore Question Bank
      </Link>

      <Link
        href="#study-workspace"
        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/10"
      >
        Open Study Workspace
      </Link>
    </div>
  );
}