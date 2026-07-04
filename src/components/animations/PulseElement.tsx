'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PulseElementProps {
  children: React.ReactNode;
  duration?: number;
  scale?: number;
}

/**
 * Pulse Element Component
 * Creates a pulsing scale animation
 *
 * @example
 * <PulseElement duration={2} scale={1.1}>
 *   <div>Pulsing content</div>
 * </PulseElement>
 */
export const PulseElement: React.FC<PulseElementProps> = ({
  children,
  duration = 2,
  scale = 1.05,
}) => {
  return (
    <motion.div
      animate={{ scale: [1, scale, 1] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PulseElement;
