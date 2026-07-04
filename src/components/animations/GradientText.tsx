'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  children: string;
  colors?: string[];
  duration?: number;
  className?: string;
}

/**
 * Gradient Text Component
 * Animated gradient text that shifts colors
 *
 * @example
 * <GradientText colors={['#0ea5e9', '#8b5cf6', '#14b8a6']}>
 *   Animated Gradient Text
 * </GradientText>
 */
export const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = ['#0ea5e9', '#8b5cf6', '#14b8a6'],
  duration = 4,
  className,
}) => {
  const gradientStyle = {
    backgroundSize: '300% 300%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties;

  return (
    <motion.div
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'ease-in-out',
      }}
      style={{
        background: `linear-gradient(135deg, ${colors.join(', ')})`,
        ...gradientStyle,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default GradientText;
