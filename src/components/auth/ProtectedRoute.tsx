'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Card from '@/components/ui/Card'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'user' | 'admin' | 'moderator'
}

export default function ProtectedRoute({
  children,
  requiredRole = 'user',
}: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  if (requiredRole !== 'user' && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <h1 className="text-2xl font-bold text-red-500 mb-2">Access Denied</h1>
          <p className="text-gray-400">You don\'t have permission to access this page.</p>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
