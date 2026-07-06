import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserAnalytics, CategoryStat, RecentActivity } from "@/types";

/**
 * Get User Analytics
 */
export const getUserAnalytics = async (
  userId: string
): Promise<UserAnalytics> => {
  try {
    const responsesRef = collection(db, "user_responses");
    const q = query(responsesRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    
    const responses = snapshot.docs.map((doc) => doc.data());
    
    const totalAttempted = responses.length;
    const correctAnswers = responses.filter(
      (r) => r.isCorrect
    ).length;
    const accuracy =
      totalAttempted === 0
        ? 0
        : Math.round(
            (correctAnswers / totalAttempted) * 100
          );
    
    const totalTimeSpent = responses.reduce(
      (sum, r) => sum + (r.timeSpent || 0),
      0
    );
    const averageTimePerQuestion =
      totalAttempted === 0
        ? 0
        : Math.round(totalTimeSpent / totalAttempted);
    
    const categoryStats: CategoryStat[] = [];
    const recentActivity = responses
      .slice(-10)
      .map((r, idx) => ({
        id: `activity-${idx}`,
        type: r.isCorrect ? "attempt" : "review",
        description: `${r.isCorrect ? "Correct" : "Incorrect"} answer submitted`,
        timestamp: new Date(),
      }));
    
    return {
      userId,
      totalQuestionsAttempted: totalAttempted,
      correctAnswers,
      accuracy,
      averageTimePerQuestion,
      categoryStats,
      recentActivity,
    };
  } catch (error: any) {
    throw new Error(
      `Failed to get analytics: ${error.message}`
    );
  }
};
