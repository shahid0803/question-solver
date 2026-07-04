'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-primary hover:bg-primary/90 text-white',
  secondary: 'bg-secondary hover:bg-secondary/90 text-white',
  accent: 'bg-accent hover:bg-accent/90 text-white',
  ghost: 'bg-transparent hover:bg-surface/50 text-text',
  outline: 'border border-border hover:bg-surface/30 text-text',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const roundedClasses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

/**
 * Glass Button Component
 * A button component with glassmorphism effect
 *
 * @example
 * <GlassButton variant="primary" size="lg">
 *   Click me
 * </GlassButton>
 */
export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = 'primary',
  size = 'md',
  hover = true,
  rounded = 'md',
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'dark:focus:ring-offset-dark-bg',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        roundedClasses[rounded],
        hover && 'glass-hover',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton;
