'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg focus-visible:ring-primary/50',
        secondary:
          'bg-secondary hover:bg-secondary/90 text-white shadow-md hover:shadow-lg focus-visible:ring-secondary/50',
        accent:
          'bg-accent hover:bg-accent/90 text-white shadow-md hover:shadow-lg focus-visible:ring-accent/50',
        outline:
          'border-2 border-primary text-primary hover:bg-primary/10 focus-visible:ring-primary/50',
        ghost: 'text-foreground hover:bg-foreground/10 focus-visible:ring-foreground/50',
        glass:
          'glass hover:bg-white/20 text-white border border-white/30 focus-visible:ring-white/50',
      },
      size: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      loading: {
        true: 'opacity-70 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      loading: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size, fullWidth, loading }), className)}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {icon && !loading && icon}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
