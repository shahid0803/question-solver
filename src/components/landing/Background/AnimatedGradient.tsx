'use client';

import { motion } from 'framer-motion';

export default function AnimatedGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Purple Glow */}
      <motion.div
        animate={{
          x: [-80, 60, -80],
          y: [-40, 40, -40],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute
          top-[-250px]
          left-[-200px]
          w-[700px]
          h-[700px]
          rounded-full
          bg-violet-600/25
          blur-[180px]"
      />

      {/* Cyan Glow */}
      <motion.div
        animate={{
          x: [60, -40, 60],
          y: [30, -30, 30],
          scale: [1.1, 0.95, 1.1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute
          bottom-[-280px]
          right-[-250px]
          w-[800px]
          h-[800px]
          rounded-full
          bg-cyan-500/20
          blur-[200px]"
      />

      {/* Orange Accent */}
      <motion.div
        animate={{
          x: [-20, 40, -20],
          y: [20, -30, 20],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute
          top-[30%]
          right-[15%]
          w-[350px]
          h-[350px]
          rounded-full
          bg-orange-500/10
          blur-[120px]"
      />
    </div>
  );
}