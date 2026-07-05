// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// PDF & Questions Types
export interface PDF {
  id: string;
  userId: string;
  filename: string;
  uploadedAt: Date;
  fileSize: number;
  status: 'processing' | 'completed' | 'failed';
  storageUrl: string;
}

export interface Question {
  id: string;
  pdfId: string;
  userId: string;
  text: string;
  options: QuestionOption[];
  correctAnswer: string;
  category: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  createdAt: Date;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// User Response Types
export interface UserResponse {
  id: string;
  userId: string;
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timestamp: Date;
  timeSpent: number; // seconds
}

// Analytics Types
export interface UserAnalytics {
  userId: string;
  totalQuestionsAttempted: number;
  correctAnswers: number;
  accuracy: number; // percentage
  averageTimePerQuestion: number;
  categoryStats: CategoryStat[];
  recentActivity: RecentActivity[];
}

export interface CategoryStat {
  category: string;
  total: number;
  correct: number;
  accuracy: number;
}

export interface RecentActivity {
  id: string;
  type: 'upload' | 'attempt' | 'review';
  description: string;
  timestamp: Date;
}

// Dashboard Types
export interface DashboardStats {
  totalPDFs: number;
  totalQuestions: number;
  questionsAttempted: number;
  accuracy: number;
  streak: number;
}
