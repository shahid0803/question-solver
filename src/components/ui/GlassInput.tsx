'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'base' | 'primary' | 'secondary' | 'accent';
  rounded?: 'sm' | 'md' | 'lg';
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const variantClasses = {
  base: 'glass-base',
  primary: 'glass-primary',
  secondary: 'glass-secondary',
  accent: 'glass-accent',
};

const roundedClasses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
};

/**
 * Glass Input Component
 * An input field with glassmorphism effect
 *
 * @example
 * <GlassInput
 *   type="email"
 *   placeholder="Enter your email"
 *   label="Email Address"
 *   variant="primary"
 * />
 */
export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      variant = 'base',
      rounded = 'md',
      label,
      error,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2 text-text">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              variantClasses[variant],
              roundedClasses[rounded],
              'w-full px-4 py-2 text-text placeholder-text-tertiary',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'dark:focus:ring-offset-dark-bg',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              icon && 'pl-10',
              error && 'ring-2 ring-error',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-error mt-1">{error}</p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;
