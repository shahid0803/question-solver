'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-primary hover:bg-primary/90 text-white',
  secondary: 'bg-secondary hover:bg-secondary/90 text-white',
  accent: 'bg-accent hover:bg-accent/90 text-white',
  ghost: 'bg-transparent hover:bg-surface/50 text-text',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

/**
 * Animated Button Component
 * Button with smooth hover and click animations
 *
 * @example
 * <AnimatedButton variant="primary" size="lg">
 *   Click me
 * </AnimatedButton>
 */
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  animated = true,
  className,
  disabled,
  children,
  ...props
}) => {
  return (
    <motion.button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'dark:focus:ring-offset-dark-bg',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      whileHover={animated && !disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={animated && !disabled ? { scale: 0.98 } : {}}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
