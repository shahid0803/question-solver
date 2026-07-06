import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserResponse } from "@/types";

/**
 * Save User Response
 */
export const saveUserResponse = async (
  userId: string,
  questionId: string,
  selectedAnswer: string,
  isCorrect: boolean,
  timeSpent: number
): Promise<UserResponse> => {
  try {
    const responsesRef = collection(db, "user_responses");
    const docRef = await addDoc(responsesRef, {
      userId,
      questionId,
      selectedAnswer,
      isCorrect,
      timeSpent,
      timestamp: serverTimestamp(),
    });
    
    return {
      id: docRef.id,
      userId,
      questionId,
      selectedAnswer,
      isCorrect,
      timestamp: new Date(),
      timeSpent,
    };
  } catch (error: any) {
    throw new Error(`Failed to save response: ${error.message}`);
  }
};

/**
 * Get User Responses for a Question
 */
export const getUserResponsesForQuestion = async (
  userId: string,
  questionId: string
): Promise<UserResponse[]> => {
  try {
    const responsesRef = collection(db, "user_responses");
    const q = query(
      responsesRef,
      where("userId", "==", userId),
      where("questionId", "==", questionId)
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || new Date(),
    })) as UserResponse[];
  } catch (error: any) {
    throw new Error(`Failed to fetch responses: ${error.message}`);
  }
};

/**
 * Get All User Responses
 */
export const getAllUserResponses = async (
  userId: string
): Promise<UserResponse[]> => {
  try {
    const responsesRef = collection(db, "user_responses");
    const q = query(responsesRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || new Date(),
    })) as UserResponse[];
  } catch (error: any) {
    throw new Error(`Failed to fetch all responses: ${error.message}`);
  }
};

/**
 * Calculate Accuracy
 */
export const calculateAccuracy = async (
  userId: string
): Promise<number> => {
  try {
    const responses = await getAllUserResponses(userId);
    if (responses.length === 0) return 0;
    
    const correctAnswers = responses.filter(
      (r) => r.isCorrect
    ).length;
    return Math.round((correctAnswers / responses.length) * 100);
  } catch (error: any) {
    throw new Error(`Failed to calculate accuracy: ${error.message}`);
  }
};
