'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassDividerProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'subtle';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const variantClasses = {
  primary: 'bg-primary/30',
  secondary: 'bg-secondary/30',
  accent: 'bg-accent/30',
  subtle: 'bg-border/30',
};

/**
 * Glass Divider Component
 * A separator line with glassmorphism effect
 *
 * @example
 * <GlassDivider variant="primary" />
 */
export const GlassDivider: React.FC<GlassDividerProps> = ({
  variant = 'subtle',
  orientation = 'horizontal',
  className,
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'w-px min-h-full',
          variantClasses[variant],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'h-px w-full',
        variantClasses[variant],
        className
      )}
    />
  );
};

export default GlassDivider;
