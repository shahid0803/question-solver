'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Background: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(109,93,246,0.16),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(0,212,255,0.12),transparent_26%),radial-gradient(circle_at_85%_18%,rgba(255,122,0,0.08),transparent_24%)]" />

      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, 24, 0],
          y: [0, -18, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-28 left-[-7rem] h-[30rem] w-[30rem] rounded-full bg-violet-600/20 blur-[130px]"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, -18, 0],
          y: [0, 20, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-10rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-cyan-500/14 blur-[140px]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,8,22,0.08),rgba(5,8,22,0.86))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.42)_100%)]" />

      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.08]" />
    </div>
  );
};

export default Background;