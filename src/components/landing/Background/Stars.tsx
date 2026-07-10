'use client';

import { motion } from 'framer-motion';

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

const stars: Star[] = Array.from({ length: 180 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 2.8 + 0.6,
  delay: Math.random() * 8,
  duration: Math.random() * 4 + 3,
  opacity: Math.random() * 0.7 + 0.2,
}));

export default function Stars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 8}px rgba(255,255,255,0.8)`,
          }}
          animate={{
            opacity: [
              star.opacity * 0.25,
              star.opacity,
              star.opacity * 0.35,
            ],
            scale: [0.8, 1.35, 0.8],
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