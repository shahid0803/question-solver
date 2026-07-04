'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

/**
 * Loading Spinner Component
 * Animated loading indicator
 *
 * @example
 * <LoadingSpinner size="lg" color="#0ea5e9" />
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = '#0ea5e9',
}) => {
  return (
    <motion.div
      className={`${sizeMap[size]} rounded-full border-2 border-transparent border-t-current`}
      style={{
        borderTopColor: color,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

export default LoadingSpinner;
