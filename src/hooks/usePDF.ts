import { useState, useCallback } from 'react';
import { PDF } from '@/types';
import { pdfUploadService } from '@/services/pdf/pdfUploadService';

export const usePDF = () => {
  const [pdfs, setPDFs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPDF = useCallback(async (file: File) => {
    try {
      setLoading(true);
      setError(null);
      const fileId = await pdfUploadService.uploadPDF(file);
      return fileId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload PDF';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePDF = useCallback(async (pdfId: string) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement delete logic
      setPDFs((prev) => prev.filter((p) => p.id !== pdfId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete PDF';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { pdfs, loading, error, uploadPDF, deletePDF };
};
