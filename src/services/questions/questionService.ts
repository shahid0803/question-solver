import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Question, UserResponse } from "@/types";

/**
 * Create Questions from PDF
 */
export const createQuestions = async (
  questions: Omit<Question, "id" | "createdAt">[]
): Promise<Question[]> => {
  try {
    const questionsRef = collection(db, "questions");
    const createdQuestions: Question[] = [];
    
    for (const question of questions) {
      const docRef = await addDoc(questionsRef, {
        ...question,
        createdAt: serverTimestamp(),
      });
      
      createdQuestions.push({
        ...question,
        id: docRef.id,
        createdAt: new Date(),
      });
    }
    
    return createdQuestions;
  } catch (error: any) {
    throw new Error(`Failed to create questions: ${error.message}`);
  }
};

/**
 * Get Questions by PDF ID
 */
export const getQuestionsByPDF = async (
  pdfId: string
): Promise<Question[]> => {
  try {
    const questionsRef = collection(db, "questions");
    const q = query(questionsRef, where("pdfId", "==", pdfId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
    })) as Question[];
  } catch (error: any) {
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }
};

/**
 * Get Question by ID
 */
export const getQuestion = async (
  questionId: string
): Promise<Question | null> => {
  try {
    const questionRef = doc(db, "questions", questionId);
    const snapshot = await getDoc(questionRef);
    
    if (!snapshot.exists()) return null;
    
    return {
      id: snapshot.id,
      ...snapshot.data(),
      createdAt: snapshot.data().createdAt?.toDate?.() || new Date(),
    } as Question;
  } catch (error: any) {
    throw new Error(`Failed to fetch question: ${error.message}`);
  }
};

/**
 * Get Questions by User ID
 */
export const getQuestionsByUser = async (
  userId: string
): Promise<Question[]> => {
  try {
    const questionsRef = collection(db, "questions");
    const q = query(questionsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
    })) as Question[];
  } catch (error: any) {
    throw new Error(`Failed to fetch user questions: ${error.message}`);
  }
};

/**
 * Update Question
 */
export const updateQuestion = async (
  questionId: string,
  updates: Partial<Question>
): Promise<void> => {
  try {
    const questionRef = doc(db, "questions", questionId);
    await updateDoc(questionRef, updates);
  } catch (error: any) {
    throw new Error(`Failed to update question: ${error.message}`);
  }
};

/**
 * Delete Question
 */
export const deleteQuestion = async (
  questionId: string
): Promise<void> => {
  try {
    const questionRef = doc(db, "questions", questionId);
    await deleteDoc(questionRef);
  } catch (error: any) {
    throw new Error(`Failed to delete question: ${error.message}`);
  }
};
