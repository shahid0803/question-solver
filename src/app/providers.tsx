'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/lib/theme/ThemeProvider'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(var(--surface), 0.95)',
              color: 'var(--text)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border)',
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
