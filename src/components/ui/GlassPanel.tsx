'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'primary' | 'secondary' | 'accent' | 'elevated' | 'subtle';
  hover?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const variantClasses = {
  base: 'glass-base',
  primary: 'glass-primary',
  secondary: 'glass-secondary',
  accent: 'glass-accent',
  elevated: 'glass-elevated',
  subtle: 'glass-subtle',
};

const roundedClasses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

/**
 * Glass Panel Component
 * A container component with glassmorphism effect
 * Supports header and footer sections
 *
 * @example
 * <GlassPanel
 *   variant="elevated"
 *   header={<h2>Panel Title</h2>}
 * >
 *   Panel content goes here
 * </GlassPanel>
 */
export const GlassPanel: React.FC<GlassPanelProps> = ({
  variant = 'base',
  hover = false,
  rounded = 'xl',
  header,
  footer,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        variantClasses[variant],
        roundedClasses[rounded],
        'transition-all duration-200 overflow-hidden',
        hover && 'glass-hover',
        className
      )}
      {...props}
    >
      {header && (
        <div className="border-b border-border/30 px-6 py-4">
          {header}
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="border-t border-border/30 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default GlassPanel;
