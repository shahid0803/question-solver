'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'primary' | 'secondary' | 'accent' | 'elevated' | 'subtle' | 'frosted';
  hover?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  children: React.ReactNode;
}

const variantClasses = {
  base: 'glass-base',
  primary: 'glass-primary',
  secondary: 'glass-secondary',
  accent: 'glass-accent',
  elevated: 'glass-elevated',
  subtle: 'glass-subtle',
  frosted: 'glass-frosted',
};

const roundedClasses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
};

/**
 * Glass Card Component
 * A reusable card component with glassmorphism effect
 *
 * @example
 * <GlassCard variant="elevated" rounded="2xl">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </GlassCard>
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'base',
  hover = false,
  rounded = 'xl',
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        variantClasses[variant],
        roundedClasses[rounded],
        'p-6 transition-all duration-200',
        hover && 'glass-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
