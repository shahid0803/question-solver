'use client'

import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ClassifiedQuestion } from '@/services/pdf/aiQuestionClassifier'

interface ExtractedQuestionsPreviewProps {
  questions: ClassifiedQuestion[]
  isLoading?: boolean
  onSave?: (questions: ClassifiedQuestion[]) => Promise<void>
}

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const colors = {
    easy: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    hard: 'bg-orange-500/20 text-orange-400',
    expert: 'bg-red-500/20 text-red-400',
  }
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[difficulty as keyof typeof colors]}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  )
}

export default function ExtractedQuestionsPreview({
  questions,
  isLoading = false,
  onSave,
}: ExtractedQuestionsPreviewProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5
  const totalPages = Math.ceil(questions.length / itemsPerPage)
  const startIdx = currentPage * itemsPerPage
  const currentQuestions = questions.slice(startIdx, startIdx + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">Total Questions</p>
          <p className="text-2xl font-bold text-primary">{questions.length}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">MCQ</p>
          <p className="text-2xl font-bold text-secondary">
            {questions.filter((q) => q.type === 'mcq').length}
          </p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">With Images</p>
          <p className="text-2xl font-bold text-accent">
            {questions.filter((q) => q.images?.length).length}
          </p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">Avg Difficulty</p>
          <p className="text-2xl font-bold text-primary">
            {questions.length > 0
              ? questions.reduce(
                  (acc, q) => {
                    const diffValues = { easy: 1, medium: 2, hard: 3, expert: 4 }
                    return acc + (diffValues[q.difficulty] || 2)
                  },
                  0
                ) / questions.length
              : 0
            }
          </p>
        </Card>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {currentQuestions.map((q) => (
          <Card key={q.questionNumber} variant="default" className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">
                  Q{q.questionNumber}: {q.text.substring(0, 100)}...
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Type: <span className="capitalize">{q.type}</span>
                </p>
              </div>
              <DifficultyBadge difficulty={q.difficulty} />
            </div>

            {/* Tags */}
            {q.tags && q.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {q.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {q.tags.length > 3 && (
                  <span className="text-gray-400 text-xs">+{q.tags.length - 3} more</span>
                )}
              </div>
            )}

            {/* Options Preview */}
            {q.options && q.options.length > 0 && (
              <div className="bg-dark-bg/50 rounded p-3 mb-3">
                <p className="text-xs text-gray-400 mb-2">Options:</p>
                <div className="space-y-1">
                  {q.options.map((opt) => (
                    <p key={opt.label} className="text-sm">
                      <span className="font-medium text-primary">{opt.label})</span> {opt.text.substring(0, 50)}...
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="flex gap-4 text-xs text-gray-400">
              {q.subject && <span>Subject: {q.subject}</span>}
              {q.topic && <span>Topic: {q.topic}</span>}
              {q.images && q.images.length > 0 && <span>📸 {q.images.length} image(s)</span>}
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Page {currentPage + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {onSave && (
        <div className="flex gap-3">
          <Button
            variant="primary"
            fullWidth
            loading={isLoading}
            onClick={() => onSave(questions)}
          >
            Save Questions to Database
          </Button>
        </div>
      )}
    </div>
  )
}
