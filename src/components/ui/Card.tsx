'use client'

import React from 'react'
import clsx from 'clsx'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered'
  hoverable?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverable = false, ...props }, ref) => {
    return (
      <div
        className={clsx(
          'rounded-xl p-6 transition-all duration-300',
          variant === 'default' && 'bg-dark-card border border-dark-border',
          variant === 'glass' && 'glass',
          variant === 'bordered' && 'bg-transparent border-2 border-primary/20',
          hoverable && 'hover:shadow-lg hover:border-primary/50 cursor-pointer',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export default Card
