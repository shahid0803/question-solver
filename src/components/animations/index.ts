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