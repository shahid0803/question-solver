'use client';

import React, { createContext, useContext } from 'react';
import { useTheme } from './useTheme';
import type { ThemeMode } from './theme';

/**
 * Theme context type
 */
interface ThemeContextType {
  theme: ThemeMode | null;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLoading: boolean;
}

/**
 * Create theme context
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme Provider Component
 * Wraps the application and provides theme context to all child components
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use theme context
 * Must be used within ThemeProvider
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  
  return context;
};
