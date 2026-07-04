'use client';

import { useEffect, useState, useCallback } from 'react';
import type { ThemeMode } from './theme';
import { THEME_STORAGE_KEY, getSystemTheme, getCSSVariables } from './theme';

/**
 * Custom hook to manage theme state and persistence
 * - Handles dark/light mode switching
 * - Persists preference to localStorage
 * - Respects system preference on first visit
 * - Updates CSS variables dynamically
 */
export const useTheme = () => {
  const [theme, setThemeState] = useState<ThemeMode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Try to get from localStorage
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
        
        if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
          setThemeState(storedTheme);
          applyTheme(storedTheme);
        } else {
          // Fall back to system preference
          const systemTheme = getSystemTheme();
          setThemeState(systemTheme);
          applyTheme(systemTheme);
        }
      } catch (error) {
        console.warn('Failed to initialize theme:', error);
        setThemeState('light');
        applyTheme('light');
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: ThemeMode) => {
    if (typeof document === 'undefined') return;

    const htmlElement = document.documentElement;

    // Update class for TailwindCSS dark mode
    if (newTheme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // Update CSS variables
    const cssVariables = getCSSVariables(newTheme);
    Object.entries(cssVariables).forEach(([key, value]) => {
      htmlElement.style.setProperty(key, value);
    });
  }, []);

  // Set theme and persist to localStorage
  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn('Failed to persist theme preference:', error);
    }
  }, [applyTheme]);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    isLoading,
    isDark: theme === 'dark',
  };
};
