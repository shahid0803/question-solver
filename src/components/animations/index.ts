'use client';

/**
 * Barrel export for all animation components
 * Simplifies imports in application
 */

export { PageTransition } from './PageTransition';
export { AnimatedButton } from './AnimatedButton';
export { ScrollAnimation } from './ScrollAnimation';
export { StaggerContainer } from './StaggerContainer';
export { FloatingElement } from './FloatingElement';
export { PulseElement } from './PulseElement';
export { GradientText } from './GradientText';
export { LoadingSpinner } from './LoadingSpinner';

// Hook exports
export { useScroll } from '@/lib/hooks/useScroll';
export { useInView } from '@/lib/hooks/useInView';

// Type exports
export type { PageTransitionProps } from './PageTransition';
export type { AnimatedButtonProps } from './AnimatedButton';
export type { ScrollAnimationProps } from './ScrollAnimation';
export type { StaggerContainerProps } from './StaggerContainer';
export type { FloatingElementProps } from './FloatingElement';
export type { PulseElementProps } from './PulseElement';
export type { GradientTextProps } from './GradientText';
export type { LoadingSpinnerProps } from './LoadingSpinner';
