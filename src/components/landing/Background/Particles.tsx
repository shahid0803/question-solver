'use client';

import { motion } from 'framer-motion';

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  blur: number;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
};

const particles: Particle[] = Array.from({ length: 72 }, (_, id) => ({
  id,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 6 + 2,
  blur: Math.random() * 8 + 2,
  opacity: Math.random() * 0.18 + 0.05,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 6,
  driftX: (Math.random() - 0.5) * 20,
  driftY: (Math.random() - 0.5) * 20,
}));

export default function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            filter: `blur(${particle.blur}px)`,
            boxShadow: `0 0 ${particle.size * 4}px rgba(255,255,255,0.25)`,
          }}
          animate={{
            x: [0, particle.driftX, 0],
            y: [0, particle.driftY, 0],
            opacity: [
              particle.opacity * 0.35,
              particle.opacity,
              particle.opacity * 0.45,
            ],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}