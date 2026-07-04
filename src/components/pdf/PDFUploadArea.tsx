'use client'

import React, { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

interface PDFUploadAreaProps {
  onUpload: (file: File) => Promise<void>
  isLoading?: boolean
  accept?: string
  maxSize?: number // in MB
}

export default function PDFUploadArea({
  onUpload,
  isLoading = false,
  accept = '.pdf',
  maxSize = 50, // 50MB default
}: PDFUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const validateFile = (file: File): boolean => {
    const maxSizeBytes = maxSize * 1024 * 1024
    
    if (!file.type.includes('pdf') && !accept.includes(file.name.split('.').pop() || '')) {
      toast.error('Please upload a PDF file')
      return false
    }

    if (file.size > maxSizeBytes) {
      toast.error(`File size must be less than ${maxSize}MB`)
      return false
    }

    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (validateFile(file)) {
        setSelectedFile(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      const file = files[0]
      if (validateFile(file)) {
        setSelectedFile(file)
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file')
      return
    }

    try {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + Math.random() * 30, 90))
      }, 200)

      await onUpload(selectedFile)
      clearInterval(interval)
      setProgress(100)
      setSelectedFile(null)
      toast.success('PDF processed successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload PDF')
      setProgress(0)
    }
  }

  return (
    <Card
      variant="glass"
      className={`border-2 border-dashed transition-all duration-300 ${
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-dark-border hover:border-primary/50'
      }`}
    >
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="text-center py-12"
      >
        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {selectedFile.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            {progress > 0 && progress < 100 && (
              <div className="w-full bg-dark-border rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            <div className="flex gap-3 justify-center pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedFile(null)}
                disabled={isLoading}
              >
                Clear
              </Button>
              <Button
                variant="primary"
                size="sm"
                loading={isLoading}
                onClick={handleUpload}
              >
                Upload & Process
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground mb-1">
                Drag and drop your PDF here
              </p>
              <p className="text-gray-400 text-sm mb-4">or click the button below</p>
            </div>

            <label>
              <input
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
                disabled={isLoading}
              />
              <Button
                as="span"
                variant="outline"
                size="md"
                className="cursor-pointer"
              >
                Select PDF File
              </Button>
            </label>

            <p className="text-gray-400 text-xs">
              Maximum file size: {maxSize}MB • Supported format: PDF
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
