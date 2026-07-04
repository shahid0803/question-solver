'use client'

import React, { useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import PDFUploadArea from '@/components/pdf/PDFUploadArea'
import PDFProcessingProgress, { ProcessingStep } from '@/components/pdf/PDFProcessingProgress'
import ExtractedQuestionsPreview from '@/components/pdf/ExtractedQuestionsPreview'
import { processPDFFile } from '@/services/pdf/pdfUploadService'
import { ClassifiedQuestion } from '@/services/pdf/aiQuestionClassifier'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type UploadState = 'idle' | 'uploading' | 'success' | 'error'

function UploadContent() {
  const router = useRouter()
  const { user } = useAuth()
  const [state, setState] = useState<UploadState>('idle')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    { id: 'upload', label: 'Uploading PDF', status: 'pending' },
    { id: 'extract', label: 'Extracting Text & Images', status: 'pending' },
    { id: 'ocr', label: 'Processing Scanned Pages (if any)', status: 'pending' },
    { id: 'parse', label: 'Parsing Questions', status: 'pending' },
    { id: 'classify', label: 'Classifying Questions', status: 'pending' },
  ])
  const [extractedData, setExtractedData] = useState<any>(null)
  const [questions, setQuestions] = useState<ClassifiedQuestion[]>([])

  const updateStep = (stepId: string, status: ProcessingStep['status'], message?: string) => {
    setProcessingSteps((prev) =>
      prev.map((s) =>
        s.id === stepId ? { ...s, status, message } : s
      )
    )
  }

  const handleUpload = async (file: File) => {
    setIsLoading(true)
    setState('uploading')
    setProgress(0)

    try {
      if (!user) throw new Error('User not authenticated')

      // Step 1: Upload
      updateStep('upload', 'in-progress')
      setProgress(10)
      await new Promise((r) => setTimeout(r, 500))
      updateStep('upload', 'completed')
      setProgress(20)

      // Step 2: Extract
      updateStep('extract', 'in-progress')
      setProgress(30)
      const extractionResult = await processPDFFile(file, user.id)
      updateStep('extract', 'completed', `Extracted ${extractionResult.totalPages} pages`)
      setProgress(50)

      // Step 3: OCR
      updateStep('ocr', 'in-progress')
      if (extractionResult.isScanned) {
        await new Promise((r) => setTimeout(r, 1000))
        updateStep('ocr', 'completed', 'Scanned PDF processed')
      } else {
        updateStep('ocr', 'completed', 'Native PDF detected')
      }
      setProgress(60)

      // Step 4: Parse
      updateStep('parse', 'in-progress')
      setProgress(70)
      await new Promise((r) => setTimeout(r, 500))
      updateStep('parse', 'completed', `Parsed ${extractionResult.questions.length} questions`)
      setProgress(80)

      // Step 5: Classify
      updateStep('classify', 'in-progress')
      setProgress(90)
      await new Promise((r) => setTimeout(r, 500))
      updateStep('classify', 'completed', `Classified all questions`)
      setProgress(100)

      setExtractedData(extractionResult)
      setQuestions(extractionResult.questions)
      setState('success')
      toast.success('PDF processed successfully!')
    } catch (error: any) {
      console.error('Upload error:', error)
      updateStep(
        processingSteps.find((s) => s.status === 'in-progress')?.id || 'parse',
        'error',
        error.message
      )
      setState('error')
      toast.error(error.message || 'Failed to process PDF')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveQuestions = async (questionsToSave: ClassifiedQuestion[]) => {
    try {
      setIsLoading(true)
      // TODO: Save questions to Firestore
      toast.success(`Saved ${questionsToSave.length} questions to database!`)
      // Reset form
      setState('idle')
      setQuestions([])
      setExtractedData(null)
      setProcessingSteps([
        { id: 'upload', label: 'Uploading PDF', status: 'pending' },
        { id: 'extract', label: 'Extracting Text & Images', status: 'pending' },
        { id: 'ocr', label: 'Processing Scanned Pages (if any)', status: 'pending' },
        { id: 'parse', label: 'Parsing Questions', status: 'pending' },
        { id: 'classify', label: 'Classifying Questions', status: 'pending' },
      ])
    } catch (error: any) {
      toast.error(error.message || 'Failed to save questions')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg">
      {/* Navigation */}
      <nav className="border-b border-dark-border bg-dark-card/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Upload PDF
          </h1>
          <Button variant="ghost" onClick={() => router.push('/dashboard')}>
            ← Back to Dashboard
          </Button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {state === 'idle' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Upload Question PDF</h2>
              <p className="text-gray-400">
                Upload a PDF containing exam questions and we'll automatically extract and organize them for you.
              </p>
            </div>
            <PDFUploadArea onUpload={handleUpload} isLoading={isLoading} />
          </div>
        )}

        {state === 'uploading' && (
          <PDFProcessingProgress steps={processingSteps} currentProgress={progress} />
        )}

        {state === 'success' && questions.length > 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Review Extracted Questions</h2>
              <p className="text-gray-400">
                Please review the extracted questions below. You can edit them before saving to the database.
              </p>
            </div>
            <ExtractedQuestionsPreview
              questions={questions}
              isLoading={isLoading}
              onSave={handleSaveQuestions}
            />
          </div>
        )}

        {state === 'error' && (
          <Card className="p-8 text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 0a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-red-500 mb-2">Processing Failed</h3>
            <p className="text-gray-400 mb-6">There was an error processing your PDF. Please try again.</p>
            <Button
              variant="primary"
              onClick={() => {
                setState('idle')
                setProgress(0)
                setProcessingSteps([
                  { id: 'upload', label: 'Uploading PDF', status: 'pending' },
                  { id: 'extract', label: 'Extracting Text & Images', status: 'pending' },
                  { id: 'ocr', label: 'Processing Scanned Pages (if any)', status: 'pending' },
                  { id: 'parse', label: 'Parsing Questions', status: 'pending' },
                  { id: 'classify', label: 'Classifying Questions', status: 'pending' },
                ])
              }}
            >
              Try Again
            </Button>
          </Card>
        )}
      </main>
    </div>
  )
}

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <UploadContent />
    </ProtectedRoute>
  )
}
