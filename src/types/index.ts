// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin' | 'moderator'
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
}

// Exam Hierarchy
export interface Exam {
  id: string
  name: string
  description: string
  shortCode: string
  icon?: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  examId: string
  name: string
  description?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Subject {
  id: string
  categoryId: string
  name: string
  description?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Topic {
  id: string
  subjectId: string
  name: string
  description?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Chapter {
  id: string
  topicId: string
  name: string
  description?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

// Question Types
export interface Question {
  id: string
  chapterId: string
  questionNumber: number
  text: string
  type: 'mcq' | 'numerical' | 'essay' | 'passage'
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  tags: string[]
  images?: string[]
  explanation?: string
  solutionUrl?: string
  source?: string
  year?: number
  createdAt: Date
  updatedAt: Date
}

export interface QuestionOption {
  id: string
  questionId: string
  optionLabel: 'A' | 'B' | 'C' | 'D' | 'E'
  text: string
  isCorrect: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface UserAnswer {
  id: string
  userId: string
  questionId: string
  selectedOption?: string
  numericalAnswer?: string
  markedForReview: boolean
  skipped: boolean
  answeredAt?: Date
  timeSpent: number // in seconds
  createdAt: Date
  updatedAt: Date
}

// Mock Test & Results
export interface MockTest {
  id: string
  userId: string
  examId: string
  categoryId?: string
  subjectId?: string
  name: string
  totalQuestions: number
  duration: number // in minutes
  startedAt?: Date
  completedAt?: Date
  status: 'not_started' | 'in_progress' | 'completed'
  createdAt: Date
  updatedAt: Date
}

export interface Result {
  id: string
  mockTestId: string
  userId: string
  totalQuestions: number
  attempted: number
  correct: number
  incorrect: number
  score: number
  percentile: number
  accuracy: number
  timeSpent: number // in minutes
  subjectWiseAnalysis: Record<string, SubjectAnalysis>
  createdAt: Date
  updatedAt: Date
}

export interface SubjectAnalysis {
  subjectId: string
  subjectName: string
  total: number
  attempted: number
  correct: number
  incorrect: number
  accuracy: number
  avgTimePerQuestion: number
}

// Bookmark & Notes
export interface Bookmark {
  id: string
  userId: string
  questionId: string
  createdAt: Date
}

export interface Note {
  id: string
  userId: string
  questionId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

// PDF Upload
export interface PDFUpload {
  id: string
  userId: string
  fileName: string
  fileSize: number
  storageUrl: string
  status: 'uploaded' | 'processing' | 'completed' | 'failed'
  extractedQuestionsCount: number
  processingError?: string
  createdAt: Date
  updatedAt: Date
}

// Authentication
export interface AuthSession {
  user: User
  token: string
  expiresAt: Date
}

// API Response
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
