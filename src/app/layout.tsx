import type { Metadata } from 'next'
import { Providers } from '@/app/providers'
import '@/styles/globals.css'
import '@/styles/theme.css'

export const metadata: Metadata = {
  title: 'Question Solver - Premium 3D Learning Platform',
  description: 'A modern, premium 3D educational web application for exam preparation with AI-powered PDF processing.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f0f1e" />
      </head>
      <body className="bg-background text-text antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
