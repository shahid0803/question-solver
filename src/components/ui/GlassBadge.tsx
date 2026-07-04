'use client';

import { cn } from '@/lib/utils';

export interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-primary/20 text-primary border-primary/30',
  secondary: 'bg-secondary/20 text-secondary border-secondary/30',
  accent: 'bg-accent/20 text-accent border-accent/30',
  success: 'bg-success/20 text-success border-success/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
  error: 'bg-error/20 text-error border-error/30',
};

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

/**
 * Glass Badge Component
 * A small badge with glassmorphism effect
 *
 * @example
 * <GlassBadge variant="primary">New</GlassBadge>
 */
export const GlassBadge: React.FC<GlassBadgeProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-full',
        'border glass-base',
        'transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default GlassBadge;
