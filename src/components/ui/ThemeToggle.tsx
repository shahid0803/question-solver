'use client';

import React from 'react';
import { useThemeContext } from '@/lib/theme/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

/**
 * Theme Toggle Button Component
 * Allows users to switch between light and dark modes
 */
export const ThemeToggle: React.FC<{
  className?: string;
  showLabel?: boolean;
}> = ({ className = '', showLabel = false }) => {
  const { isDark, toggleTheme, isLoading } = useThemeContext();

  if (isLoading) {
    return (
      <div className={`w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-10 h-10 rounded-lg
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-700
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        dark:focus:ring-offset-dark-bg
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        {isDark ? (
          <Moon
            className="w-5 h-5 text-yellow-500 transition-opacity duration-200"
            fill="currentColor"
          />
        ) : (
          <Sun
            className="w-5 h-5 text-yellow-600 transition-opacity duration-200"
            fill="currentColor"
          />
        )}
      </div>
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};
