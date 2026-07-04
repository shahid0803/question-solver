import { db, storage } from '@/lib/firebase'
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { PDFUpload } from '@/types'
import { extractAndProcessPDF } from './pdfExtractor'
import { classifyQuestionsLocally } from './aiQuestionClassifier'

/**
 * Upload PDF file to Firebase Storage
 */
export const uploadPDFToStorage = async (file: File, userId: string): Promise<string> => {
  try {
    const fileName = `${userId}/${Date.now()}_${file.name}`
    const fileRef = ref(storage, `pdfs/${fileName}`)
    
    await uploadBytes(fileRef, file)
    const downloadURL = await getDownloadURL(fileRef)
    
    return downloadURL
  } catch (error) {
    console.error('Error uploading PDF to storage:', error)
    throw new Error('Failed to upload PDF file')
  }
}

/**
 * Create PDF upload record in Firestore
 */
export const createPDFUploadRecord = async (
  userId: string,
  file: File,
  storageUrl: string
): Promise<string> => {
  try {
    const pdfUpload: Omit<PDFUpload, 'id'> = {
      userId,
      fileName: file.name,
      fileSize: file.size,
      storageUrl,
      status: 'processing',
      extractedQuestionsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const docRef = await addDoc(collection(db, 'pdf_uploads'), pdfUpload)
    return docRef.id
  } catch (error) {
    console.error('Error creating PDF upload record:', error)
    throw new Error('Failed to create PDF upload record')
  }
}

/**
 * Update PDF upload status
 */
export const updatePDFUploadStatus = async (
  uploadId: string,
  status: PDFUpload['status'],
  extractedQuestionsCount: number = 0,
  error?: string
): Promise<void> => {
  try {
    const uploadRef = doc(db, 'pdf_uploads', uploadId)
    await updateDoc(uploadRef, {
      status,
      extractedQuestionsCount,
      processingError: error || null,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error('Error updating PDF upload status:', error)
    throw error
  }
}

/**
 * Process uploaded PDF file
 */
export const processPDFFile = async (file: File, userId: string): Promise<any> => {
  let uploadId = ''
  
  try {
    // Upload to storage
    const storageUrl = await uploadPDFToStorage(file, userId)
    
    // Create upload record
    uploadId = await createPDFUploadRecord(userId, file, storageUrl)
    
    // Extract and process PDF
    const extractionResult = await extractAndProcessPDF(file)
    
    if (extractionResult.error) {
      await updatePDFUploadStatus(uploadId, 'failed', 0, extractionResult.error)
      throw new Error(extractionResult.error)
    }
    
    // Classify questions locally (fallback if AI is unavailable)
    const classifiedQuestions = classifyQuestionsLocally(extractionResult.questions)
    
    // Update status to completed
    await updatePDFUploadStatus(
      uploadId,
      'completed',
      classifiedQuestions.length
    )
    
    return {
      uploadId,
      ...extractionResult,
      questions: classifiedQuestions,
    }
  } catch (error: any) {
    if (uploadId) {
      await updatePDFUploadStatus(
        uploadId,
        'failed',
        0,
        error.message || 'Unknown error occurred'
      )
    }
    throw error
  }
}
