/**
 * Theme configuration for light and dark modes
 * Centralizes all theme-related constants and utilities
 */

export const THEME_COLORS = {
  light: {
    // Primary colors
    primary: '#0ea5e9',
    primaryLight: '#e0f2fe',
    primaryDark: '#075985',

    // Secondary colors
    secondary: '#8b5cf6',
    secondaryLight: '#ede9fe',
    secondaryDark: '#5b21b6',

    // Accent colors
    accent: '#14b8a6',
    accentLight: '#ccfbf1',
    accentDark: '#0d9488',

    // Neutral colors
    background: '#ffffff',
    surface: '#f8fafc',
    border: '#e2e8f0',
    text: '#0f172a',
    textSecondary: '#64748b',
    textTertiary: '#94a3b8',

    // Semantic colors
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  dark: {
    // Primary colors (same hue, adjusted for dark mode)
    primary: '#0ea5e9',
    primaryLight: '#075985',
    primaryDark: '#38bdf8',

    // Secondary colors
    secondary: '#8b5cf6',
    secondaryLight: '#5b21b6',
    secondaryDark: '#a78bfa',

    // Accent colors
    accent: '#14b8a6',
    accentLight: '#0d9488',
    accentDark: '#5eead4',

    // Neutral colors
    background: '#0f0f1e',
    surface: '#1a1a2e',
    border: '#2d3561',
    text: '#e2e8f0',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',

    // Semantic colors
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Neon colors (dark mode only)
    neonGreen: '#39ff14',
    neonPink: '#ff10f0',
    neonBlue: '#00d9ff',
    neonPurple: '#b537f2',
  },
} as const;

/**
 * CSS custom properties (variables) for theme colors
 * These are injected into the document root
 */
export const getCSSVariables = (theme: 'light' | 'dark') => {
  const colors = THEME_COLORS[theme];
  return {
    '--primary': colors.primary,
    '--primary-light': colors.primaryLight,
    '--primary-dark': colors.primaryDark,
    '--secondary': colors.secondary,
    '--secondary-light': colors.secondaryLight,
    '--secondary-dark': colors.secondaryDark,
    '--accent': colors.accent,
    '--accent-light': colors.accentLight,
    '--accent-dark': colors.accentDark,
    '--background': colors.background,
    '--surface': colors.surface,
    '--border': colors.border,
    '--text': colors.text,
    '--text-secondary': colors.textSecondary,
    '--text-tertiary': colors.textTertiary,
    '--success': colors.success,
    '--warning': colors.warning,
    '--error': colors.error,
    '--info': colors.info,
    ...(theme === 'dark' && {
      '--neon-green': (colors as typeof THEME_COLORS.dark).neonGreen,
      '--neon-pink': (colors as typeof THEME_COLORS.dark).neonPink,
      '--neon-blue': (colors as typeof THEME_COLORS.dark).neonBlue,
      '--neon-purple': (colors as typeof THEME_COLORS.dark).neonPurple,
    }),
  };
};

/**
 * Theme keys for type safety
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Local storage key for theme preference
 */
export const THEME_STORAGE_KEY = 'question-solver-theme';

/**
 * System preference check
 */
export const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
