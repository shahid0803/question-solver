import * as pdfjsLib from 'pdfjs-dist'
import Tesseract from 'tesseract.js'

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

export interface ExtractedQuestion {
  questionNumber: number
  text: string
  type: 'mcq' | 'numerical' | 'essay' | 'passage'
  images: string[]
  options?: {
    label: 'A' | 'B' | 'C' | 'D' | 'E'
    text: string
  }[]
  correctAnswer?: string
  explanation?: string
}

export interface PDFExtractionResult {
  totalPages: number
  totalQuestions: number
  questions: ExtractedQuestion[]
  extractedText: string
  hasImages: boolean
  isScanned: boolean
  error?: string
}

/**
 * Extract text from PDF using PDF.js
 */
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item: any) => item.str).join(' ')
      fullText += `\n--- Page ${i} ---\n${pageText}`
    }

    return fullText
  } catch (error) {
    console.error('Error extracting text from PDF:', error)
    throw new Error('Failed to extract text from PDF')
  }
}

/**
 * Extract images from PDF
 */
export const extractImagesFromPDF = async (file: File): Promise<string[]> => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const images: string[] = []

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const operatorList = await page.getOperatorList()
      const viewport = page.getViewport({ scale: 2 })
      const canvas = document.createElement('canvas')
      canvas.width = viewport.width
      canvas.height = viewport.height
      const context = canvas.getContext('2d')

      if (context) {
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        }
        await page.render(renderContext).promise
        images.push(canvas.toDataURL('image/jpeg'))
      }
    }

    return images
  } catch (error) {
    console.error('Error extracting images from PDF:', error)
    return []
  }
}

/**
 * Detect if PDF is scanned using OCR
 */
export const detectScannedPDF = async (file: File): Promise<boolean> => {
  try {
    const text = await extractTextFromPDF(file)
    // If extracted text is less than 100 characters, likely a scanned PDF
    return text.trim().length < 100
  } catch {
    return false
  }
}

/**
 * Perform OCR on scanned PDF using Tesseract
 */
export const performOCROnPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale: 2 })
      const canvas = document.createElement('canvas')
      canvas.width = viewport.width
      canvas.height = viewport.height
      const context = canvas.getContext('2d')

      if (context) {
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        }
        await page.render(renderContext).promise

        const result = await Tesseract.recognize(canvas, 'eng', {
          logger: (m) => console.log('OCR Progress:', m),
        })
        fullText += `\n--- Page ${i} ---\n${result.data.text}`
      }
    }

    return fullText
  } catch (error) {
    console.error('Error performing OCR on PDF:', error)
    throw new Error('Failed to perform OCR on PDF')
  }
}

/**
 * Parse questions from extracted text
 */
export const parseQuestionsFromText = (text: string): ExtractedQuestion[] => {
  const questions: ExtractedQuestion[] = []
  
  // Simple pattern matching for question numbers and MCQ options
  // This is a basic implementation - real-world would need more sophisticated NLP
  const questionPattern = /(?:Q\.?\s*|Question\s+)(\d+)[.\s]*(.*?)(?=(?:Q\.?\s*|Question\s+)?\d+[.\s]|$)/gis
  const optionPattern = /\([A-D]\)|[A-D]\)|[A-D]\.\s+(.*?)(?=[A-D]\)|$)/gi

  let match
  let questionNumber = 1

  while ((match = questionPattern.exec(text)) !== null) {
    const questionText = match[2].trim()
    const options: ExtractedQuestion['options'] = []
    
    let optionMatch
    let optionIndex = 0
    while ((optionMatch = optionPattern.exec(questionText)) !== null && optionIndex < 4) {
      options.push({
        label: ['A', 'B', 'C', 'D'][optionIndex] as 'A' | 'B' | 'C' | 'D' | 'E',
        text: optionMatch[1]?.trim() || '',
      })
      optionIndex++
    }

    questions.push({
      questionNumber: questionNumber++,
      text: questionText.split(/\([A-D]\)|[A-D]\)/)[0].trim(),
      type: options.length > 0 ? 'mcq' : 'numerical',
      images: [],
      options: options.length > 0 ? options : undefined,
    })
  }

  return questions
}

/**
 * Full PDF extraction and processing
 */
export const extractAndProcessPDF = async (file: File): Promise<PDFExtractionResult> => {
  try {
    // Check if scanned
    const isScanned = await detectScannedPDF(file)
    
    // Extract text
    let extractedText = ''
    if (isScanned) {
      extractedText = await performOCROnPDF(file)
    } else {
      extractedText = await extractTextFromPDF(file)
    }

    // Extract images
    const images = await extractImagesFromPDF(file)

    // Parse questions
    const questions = parseQuestionsFromText(extractedText)

    // Get PDF page count
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    return {
      totalPages: pdf.numPages,
      totalQuestions: questions.length,
      questions,
      extractedText,
      hasImages: images.length > 0,
      isScanned,
    }
  } catch (error: any) {
    return {
      totalPages: 0,
      totalQuestions: 0,
      questions: [],
      extractedText: '',
      hasImages: false,
      isScanned: false,
      error: error.message || 'Failed to extract and process PDF',
    }
  }
}
