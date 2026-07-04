'use client'

import { useThemeContext } from '@/lib/theme/ThemeProvider'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function Home() {
  const { isDark } = useThemeContext()

  return (
    <main className="min-h-screen bg-background text-text">
      {/* Header with Theme Toggle */}
      <header className="fixed top-0 right-0 p-4 z-50">
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Question Solver
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-text-secondary">
            Premium 3D Educational Platform
          </p>
          <p className="text-lg text-text-tertiary mb-12">
            Learn with a unique futuristic design
          </p>

          {/* Theme Info Card */}
          <div className="inline-block glass rounded-2xl p-8 backdrop-blur-lg border border-white/10">
            <p className="text-sm mb-4 text-text-secondary">
              Current Theme Mode:
            </p>
            <p className="text-2xl font-bold">
              {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </p>
            <p className="text-xs text-text-tertiary mt-4">
              Click the toggle button in the top-right corner to switch themes
            </p>
          </div>

          <p className="text-gray-500 mt-12">
            Coming soon... 🚀
          </p>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
    </main>
  )
}
