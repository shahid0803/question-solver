'use client';

import { motion } from 'framer-motion';

export default function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden transform-gpu will-change-transform">
      <motion.div
        animate={{
          x: [-30, 35, -30],
          y: [10, -18, 10],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-[22%] top-[18%] h-[18rem] w-[18rem] rounded-full bg-cyan-400/10 blur-[120px] transform-gpu will-change-transform"
      />

      <motion.div
        animate={{
          x: [22, -28, 22],
          y: [-12, 16, -12],
          opacity: [0.16, 0.24, 0.16],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-[14%] top-[24%] h-[22rem] w-[22rem] rounded-full bg-violet-500/12 blur-[140px] transform-gpu will-change-transform"
      />

      <motion.div
        animate={{
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.03),transparent_35%)] transform-gpu will-change-transform"
      />
    </div>
  );
}