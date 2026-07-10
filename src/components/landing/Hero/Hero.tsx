'use client';

import React from 'react';
import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import HeroButtons from './HeroButtons';
import HeroStats from './HeroStats';
import Scene from '../ThreeScene/Scene';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] pt-28 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-8rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="absolute bottom-[-10rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,8,22,0.15),rgba(5,8,22,0.85))]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col justify-center">
          <HeroContent />
          <HeroButtons />
          <HeroStats />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-[640px] overflow-visible">

           

            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-violet-500/20 via-cyan-400/10 to-orange-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
              <div className="relative aspect-[4/3] rounded-[1.5rem] border border-white/10 bg-[#0b1220]">
              <Scene />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,93,246,0.18),transparent_55%)]" />
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                    3D experience coming alive
                  </div>

                  <div className="relative w-[78%] max-w-[380px] rounded-[1.6rem] border border-white/15 bg-[#10192e] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                    <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-orange-400 opacity-70" />
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-red-400/80" />
                        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                      </div>
                      <span className="text-xs text-white/40">AI Learning Platform</span>
                    </div>

                    <div className="space-y-3 text-left">
                      <div className="h-4 w-5/6 rounded-full bg-white/8" />
                      <div className="h-4 w-4/6 rounded-full bg-white/8" />
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="h-20 rounded-2xl border border-white/10 bg-white/5" />
                        <div className="h-20 rounded-2xl border border-white/10 bg-white/5" />
                      </div>
                      <div className="h-24 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-cyan-400/10 to-orange-400/10" />
                    </div>
                  </div>

                  <div className="mt-8 grid w-full grid-cols-3 gap-3 px-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Solve</p>
                      <p className="mt-2 text-sm font-semibold text-white">Practice Sets</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">AI</p>
                      <p className="mt-2 text-sm font-semibold text-white">PDF Generator</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Track</p>
                      <p className="mt-2 text-sm font-semibold text-white">Analytics</p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_55%,transparent_40%,rgba(0,0,0,0.45)_100%)]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;