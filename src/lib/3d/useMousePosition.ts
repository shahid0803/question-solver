'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for handling mouse movement tracking
 * Useful for interactive 3D effects
 */
export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export const useMousePosition = () => {
  const [mousePos, setMousePos] = useRef<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  }).current as MousePosition;

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
    mousePos.normalizedX = event.clientX / window.innerWidth;
    mousePos.normalizedY = event.clientY / window.innerHeight;
  }, [mousePos]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return mousePos;
};

export default useMousePosition;
