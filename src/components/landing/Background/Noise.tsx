'use client';

import { motion } from 'framer-motion';

export default function Noise() {
  return (
    <motion.div
      aria-hidden="true"
      animate={{
        opacity: [0.05, 0.09, 0.05],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="
        absolute
        inset-0
        pointer-events-none
        transform-gpu
        will-change-transform
        mix-blend-soft-light
        opacity-[0.08]
        [background-image:
          linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
        [background-size:90px_90px]
      "
    />
  );
}