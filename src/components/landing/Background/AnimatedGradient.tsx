'use client';

import { motion } from 'framer-motion';

export default function AnimatedGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden transform-gpu will-change-transform">
      <motion.div
        animate={{
          x: [-120, 90, -120],
          y: [-60, 45, -60],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-[-12rem] top-[-14rem] h-[40rem] w-[40rem] rounded-full bg-violet-600/20 blur-[180px] transform-gpu will-change-transform"
      />

      <motion.div
        animate={{
          x: [90, -70, 90],
          y: [35, -50, 35],
          scale: [1.05, 0.97, 1.05],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-[-14rem] top-[10%] h-[42rem] w-[42rem] rounded-full bg-cyan-500/14 blur-[200px] transform-gpu will-change-transform"
      />

      <motion.div
        animate={{
          x: [-40, 60, -40],
          y: [30, -25, 30],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-18rem] left-[18%] h-[34rem] w-[34rem] rounded-full bg-orange-500/10 blur-[150px] transform-gpu will-change-transform"
      />

      <motion.div
        animate={{ opacity: [0.14, 0.24, 0.14] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_42%)] transform-gpu will-change-transform"
      />
    </div>
  );
}