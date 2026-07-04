'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
  delay?: number;
}

/**
 * Floating Element Component
 * Creates a gentle floating animation
 *
 * @example
 * <FloatingElement duration={3} distance={10}>
 *   <Icon />
 * </FloatingElement>
 */
export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  duration = 3,
  distance = 10,
  delay = 0,
}) => {
  return (
    <motion.div
      animate={{ y: [0, -distance, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
