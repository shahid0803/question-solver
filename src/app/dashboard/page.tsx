'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import { signOutUser } from '@/services/auth/authService'
import { useAuthStore } from '@/lib/auth/authStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

function DashboardContent() {
  const router = useRouter()
  const { user } = useAuth()
  const { logout } = useAuthStore()

  const handleLogout = async () => {
    try {
      await signOutUser()
      logout()
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg">
      <nav className="border-b border-dark-border bg-dark-card/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Question Solver
          </h1>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-dark-card border border-dark-border rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-2">Welcome, {user?.name}! 👋</h2>
          <p className="text-gray-400 mb-6">Email: {user?.email}</p>
          <p className="text-gray-300">
            This is your dashboard. More features coming soon! 🚀
          </p>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
