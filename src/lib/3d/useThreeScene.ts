'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for managing Three.js scene setup
 * Handles canvas initialization, sizing, and cleanup
 */
export const useThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    setIsReady(true);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return {
    containerRef,
    isReady,
    dimensions,
  };
};

export default useThreeScene;
