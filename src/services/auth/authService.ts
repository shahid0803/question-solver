import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { User } from '@/types'

const googleProvider = new GoogleAuthProvider()

/**
 * Convert Firebase User to our User interface
 */
export const firebaseUserToUser = async (firebaseUser: FirebaseUser): Promise<User> => {
  const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
  const userData = userDoc.data()

  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || userData?.name || 'User',
    avatar: firebaseUser.photoURL || userData?.avatar,
    role: userData?.role || 'user',
    createdAt: new Date(userData?.createdAt || Date.now()),
    updatedAt: new Date(userData?.updatedAt || Date.now()),
    lastLogin: new Date(),
  }
}

/**
 * Create user document in Firestore
 */
export const createUserDocument = async (user: User): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', user.id), {
      email: user.email,
      name: user.name,
      avatar: user.avatar || null,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
    })
  } catch (error) {
    console.error('Error creating user document:', error)
    throw error
  }
}

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = result.user

    // Update profile with display name
    await updateProfile(firebaseUser, { displayName: name })

    // Create user document in Firestore
    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: name,
      avatar: null,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
    }

    await createUserDocument(user)
    return user
  } catch (error: any) {
    const message = error.message || 'Error signing up'
    throw new Error(message)
  }
}

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const firebaseUser = result.user
    const user = await firebaseUserToUser(firebaseUser)
    return user
  } catch (error: any) {
    const message = error.message || 'Error signing in'
    throw new Error(message)
  }
}

/**
 * Sign in with Google
 */
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const firebaseUser = result.user

    // Check if user document exists
    const userDocRef = doc(db, 'users', firebaseUser.uid)
    const userDoc = await getDoc(userDocRef)

    if (!userDoc.exists()) {
      // Create new user document for first-time Google sign-in
      const user: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || 'User',
        avatar: firebaseUser.photoURL || null,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: new Date(),
      }
      await createUserDocument(user)
      return user
    }

    // Update lastLogin for existing user
    await setDoc(
      userDocRef,
      { lastLogin: new Date() },
      { merge: true }
    )

    const user = await firebaseUserToUser(firebaseUser)
    return user
  } catch (error: any) {
    const message = error.message || 'Error signing in with Google'
    throw new Error(message)
  }
}

/**
 * Send password reset email
 */
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    const message = error.message || 'Error sending password reset email'
    throw new Error(message)
  }
}

/**
 * Sign out
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error: any) {
    const message = error.message || 'Error signing out'
    throw new Error(message)
  }
}

/**
 * Get current user
 */
export const getCurrentUser = async (firebaseUser: FirebaseUser): Promise<User> => {
  try {
    return await firebaseUserToUser(firebaseUser)
  } catch (error) {
    console.error('Error getting current user:', error)
    throw error
  }
}
