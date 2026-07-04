import { ExtractedQuestion } from './pdfExtractor'
import { ApiResponse } from '@/types'

export interface ClassifiedQuestion extends ExtractedQuestion {
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  tags: string[]
  subject?: string
  topic?: string
  chapter?: string
}

/**
 * Call AI API to classify questions (OpenAI or Claude)
 */
export const classifyQuestionsWithAI = async (
  questions: ExtractedQuestion[],
  examType: string,
  apiProvider: 'openai' | 'anthropic' = 'openai'
): Promise<ClassifiedQuestion[]> => {
  try {
    const response = await fetch('/api/classify-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questions,
        examType,
        provider: apiProvider,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }

    const data: ApiResponse<ClassifiedQuestion[]> = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Failed to classify questions')
    }

    return data.data || []
  } catch (error: any) {
    console.error('Error classifying questions:', error)
    throw error
  }
}

/**
 * Local heuristic-based question classification (fallback)
 */
export const classifyQuestionsLocally = (questions: ExtractedQuestion[]): ClassifiedQuestion[] => {
  return questions.map((q) => {
    // Simple heuristics for difficulty
    const wordCount = q.text.split(' ').length
    let difficulty: 'easy' | 'medium' | 'hard' | 'expert'
    
    if (wordCount < 20) difficulty = 'easy'
    else if (wordCount < 50) difficulty = 'medium'
    else if (wordCount < 100) difficulty = 'hard'
    else difficulty = 'expert'

    // Extract tags based on keywords
    const tags: string[] = []
    const text = q.text.toLowerCase()
    
    if (text.includes('derive') || text.includes('prove')) tags.push('proof')
    if (text.includes('calculate') || text.includes('compute')) tags.push('calculation')
    if (text.includes('graph') || text.includes('plot')) tags.push('graph')
    if (text.includes('definition')) tags.push('definition')
    if (text.includes('why') || text.includes('explain')) tags.push('conceptual')
    if (text.includes('error') || text.includes('mistake')) tags.push('mistake-finding')
    
    if (tags.length === 0) tags.push('general')

    return {
      ...q,
      difficulty,
      tags,
    }
  })
}

/**
 * Detect duplicate questions in a set
 */
export const detectDuplicateQuestions = (questions: ClassifiedQuestion[]): string[] => {
  const duplicates: string[] = []
  const seen = new Map<string, number>()

  questions.forEach((q, index) => {
    // Simple text similarity check
    const normalizedText = q.text.toLowerCase().replace(/\s+/g, ' ')
    
    for (const [key, prevIndex] of seen.entries()) {
      if (similarity(normalizedText, key) > 0.85) {
        duplicates.push(`Question ${q.questionNumber} is similar to Question ${questions[prevIndex].questionNumber}`)
      }
    }
    
    seen.set(normalizedText, index)
  })

  return duplicates
}

/**
 * Calculate similarity between two strings (Levenshtein distance based)
 */
function similarity(str1: string, str2: string): number {
  const len1 = str1.length
  const len2 = str2.length
  const matrix: number[][] = Array(len1 + 1)
    .fill(null)
    .map(() => Array(len2 + 1).fill(0))

  for (let i = 0; i <= len1; i++) matrix[i][0] = i
  for (let j = 0; j <= len2; j++) matrix[0][j] = j

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      )
    }
  }

  const maxLen = Math.max(len1, len2)
  return 1 - matrix[len1][len2] / maxLen
}
