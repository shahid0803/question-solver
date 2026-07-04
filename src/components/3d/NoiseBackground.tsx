'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NoiseBackgroundProps {
  className?: string;
  opacity?: number;
  variant?: 'light' | 'dark' | 'none';
}

/**
 * Noise Background Component
 * Creates a subtle animated noise texture background
 * Uses CSS animations and SVG filters
 *
 * @example
 * <NoiseBackground variant="dark" opacity={0.5} />
 */
export const NoiseBackground: React.FC<NoiseBackgroundProps> = ({
  className = '',
  opacity = 0.5,
  variant = 'dark',
}) => {
  if (variant === 'none') return null;

  return (
    <>
      <svg className="hidden">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            result="noise"
            seed="2"
          />
          <feColorMatrix in="noise" type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className={cn(
          'absolute inset-0 pointer-events-none',
          className
        )}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" /%3E%3C/filter%3E%3Crect width="400" height="400" fill="%23ffffff" opacity="0.05" filter="url(%23noiseFilter)" /%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
          opacity,
          animation: 'none',
        }}
      />
    </>
  );
};

export default NoiseBackground;
