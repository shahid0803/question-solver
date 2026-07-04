'use client'

import React from 'react'
import clsx from 'clsx'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
            {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
          <input
            type={type}
            className={clsx(
              'w-full px-4 py-2 rounded-lg transition-all duration-200',
              'bg-dark-card border border-dark-border',
              'text-foreground placeholder-gray-400',
              'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              icon && 'pl-10',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {helperText && !error && <p className="text-gray-400 text-sm mt-1">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
