'use client'

import React from 'react'
import Card from '@/components/ui/Card'

export interface ProcessingStep {
  id: string
  label: string
  status: 'pending' | 'in-progress' | 'completed' | 'error'
  message?: string
}

interface PDFProcessingProgressProps {
  steps: ProcessingStep[]
  currentProgress: number
}

export default function PDFProcessingProgress({
  steps,
  currentProgress,
}: PDFProcessingProgressProps) {
  return (
    <Card variant="default" className="space-y-6">
      {/* Overall Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Processing Progress</h3>
          <span className="text-sm text-gray-400">{currentProgress}%</span>
        </div>
        <div className="w-full bg-dark-border rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
            style={{ width: `${currentProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            {/* Status Icon */}
            <div className="mt-1">
              {step.status === 'completed' && (
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              {step.status === 'in-progress' && (
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              )}
              {step.status === 'pending' && (
                <div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>
              )}
              {step.status === 'error' && (
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 pt-0.5">
              <p className="font-medium text-foreground">{step.label}</p>
              {step.message && (
                <p className={`text-sm ${
                  step.status === 'error' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {step.message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
