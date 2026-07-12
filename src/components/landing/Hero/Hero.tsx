'use client';

import React from 'react';
import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import HeroButtons from './HeroButtons';
import HeroStats from './HeroStats';
import WorkspaceStage from './WorkspaceStage';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#050816] pt-28 pb-16 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-8rem] right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-violet-600/25 blur-[140px]" />
        <div className="absolute bottom-[-10rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-cyan-500/15 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,8,22,0.08),rgba(5,8,22,0.88))]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
          <div className="relative z-10 flex flex-col justify-center">
            <HeroContent />
            <HeroButtons />
            <HeroStats />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.12 }}
            className="relative"
          >
            <WorkspaceStage />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;