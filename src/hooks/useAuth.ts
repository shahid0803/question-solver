'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/lib/auth/authStore'
import { getCurrentUser } from '@/services/auth/authService'
import { User } from '@/types'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { user, token, setUser, setToken, setLoading } = useAuthStore()

  useEffect(() => {
    setIsLoading(true)
    setLoading(true)

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken()
          const userData = await getCurrentUser(firebaseUser)
          setUser(userData)
          setToken(token)
        } else {
          setUser(null)
          setToken(null)
        }
      } catch (error) {
        console.error('Error in onAuthStateChanged:', error)
        setUser(null)
        setToken(null)
      } finally {
        setIsLoading(false)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [setUser, setToken, setLoading])

  return {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
  }
}
