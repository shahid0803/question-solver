'use client';

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-5">

      <button className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-2xl transition hover:scale-105">
        Explore Question Bank
      </button>

      <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
        Generate from PDF
      </button>

    </div>
  );
}