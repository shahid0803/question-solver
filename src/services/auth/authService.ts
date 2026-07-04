import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import { User } from "@/types";

import {
  createUserProfile,
  getUserProfile,
  updateLastLogin,
} from "@/services/user/userService";

const googleProvider = new GoogleAuthProvider();

/**
 * Convert Firebase User -> App User
 */
export const firebaseUserToUser = async (
  firebaseUser: FirebaseUser
): Promise<User> => {
  const profile = await getUserProfile(firebaseUser.uid);

  return {
    id: firebaseUser.uid,
    email: firebaseUser.email ?? "",
    name:
      firebaseUser.displayName ??
      profile?.name ??
      "User",
    avatar:
      firebaseUser.photoURL ??
      profile?.avatar ??
      null,
    role: profile?.role ?? "user",

    createdAt:
      profile?.createdAt?.toDate?.() ??
      new Date(),

    updatedAt:
      profile?.updatedAt?.toDate?.() ??
      new Date(),

    lastLogin: new Date(),
  };
};

/**
 * Email Signup
 */
export const signUpWithEmail = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  try {
    const credential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const firebaseUser = credential.user;

    await updateProfile(firebaseUser, {
      displayName: name,
    });

    await createUserProfile(
      firebaseUser.uid,
      email,
      name,
      null
    );

    return await firebaseUserToUser(firebaseUser);
  } catch (error: any) {
    throw new Error(getFirebaseError(error.code));
  }
};

/**
 * Email Login
 */
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const credential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    await updateLastLogin(
      credential.user.uid
    );

    return await firebaseUserToUser(
      credential.user
    );
  } catch (error: any) {
    throw new Error(getFirebaseError(error.code));
  }
};

/**
 * Google Login
 */
export const signInWithGoogle =
  async (): Promise<User> => {
    try {
      const credential =
        await signInWithPopup(
          auth,
          googleProvider
        );

      const firebaseUser =
        credential.user;

      const profile =
        await getUserProfile(
          firebaseUser.uid
        );

      if (!profile) {
        await createUserProfile(
          firebaseUser.uid,
          firebaseUser.email ?? "",
          firebaseUser.displayName ??
            "User",
          firebaseUser.photoURL
        );
      } else {
        await updateLastLogin(
          firebaseUser.uid
        );
      }

      return await firebaseUserToUser(
        firebaseUser
      );
    } catch (error: any) {
      throw new Error(getFirebaseError(error.code));
    }
  };

/**
 * Password Reset
 */
export const sendPasswordReset =
  async (
    email: string
  ): Promise<void> => {
    try {
      await sendPasswordResetEmail(
        auth,
        email
      );
    } catch (error: any) {
      throw new Error(
        getFirebaseError(error.code)
      );
    }
  };

/**
 * Logout
 */
export const signOutUser =
  async (): Promise<void> => {
    await signOut(auth);
  };

/**
 * Current User
 */
export const getCurrentUser =
  async (
    firebaseUser: FirebaseUser
  ): Promise<User> => {
    return firebaseUserToUser(
      firebaseUser
    );
  };

/**
 * Firebase Error Mapping
 */
function getFirebaseError(
  code: string
): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email is already registered.";

    case "auth/invalid-email":
      return "Invalid email address.";

    case "auth/user-not-found":
      return "No account found.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/invalid-credential":
      return "Invalid email or password.";

    case "auth/weak-password":
      return "Password must be at least 6 characters.";

    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";

    default:
      return "Something went wrong. Please try again.";
  }
}
