'use client';

import { motion } from 'framer-motion';

type Star = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

const stars: Star[] = Array.from({ length: 140 }, (_, id) => ({
  id,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 2.2 + 0.6,
  delay: Math.random() * 10,
  duration: Math.random() * 4 + 3.5,
  opacity: Math.random() * 0.5 + 0.18,
}));

export default function Stars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden transform-gpu will-change-transform">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white transform-gpu will-change-transform"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 10}px rgba(255,255,255,0.85)`,
          }}
          animate={{
            opacity: [star.opacity * 0.25, star.opacity, star.opacity * 0.35],
            scale: [0.8, 1.28, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}