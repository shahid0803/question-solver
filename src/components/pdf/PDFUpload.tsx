'use client';

import React, { useCallback, useState } from 'react';
import { GlassCard, GlassButton } from '@/components/ui';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { pdfUploadService } from '@/services/pdf/pdfUploadService';
import toast from 'react-hot-toast';

interface PDFUploadProps {
  onUploadComplete?: (fileId: string) => void;
}

export const PDFUpload: React.FC<PDFUploadProps> = ({ onUploadComplete }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; status: 'success' | 'error' | 'processing'; id?: string }>
  >([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const processFiles = async (files: FileList) => {
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type !== 'application/pdf') {
          setUploadedFiles((prev) => [
            ...prev,
            { name: file.name, status: 'error' },
          ]);
          toast.error(`${file.name} is not a PDF`);
          continue;
        }

        setUploadedFiles((prev) => [
          ...prev,
          { name: file.name, status: 'processing' },
        ]);

        try {
          const fileId = await pdfUploadService.uploadPDF(file);
          setUploadedFiles((prev) => {
            const updated = [...prev];
            const index = updated.findIndex((f) => f.name === file.name);
            if (index !== -1) {
              updated[index] = { name: file.name, status: 'success', id: fileId };
            }
            return updated;
          });
          setUploadProgress(Math.round(((i + 1) / files.length) * 100));
          toast.success(`${file.name} uploaded successfully`);
          onUploadComplete?.(fileId);
        } catch (error) {
          setUploadedFiles((prev) => {
            const updated = [...prev];
            const index = updated.findIndex((f) => f.name === file.name);
            if (index !== -1) {
              updated[index] = { name: file.name, status: 'error' };
            }
            return updated;
          });
          toast.error(`Failed to upload ${file.name}`);
        }
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        processFiles(files);
      }
    },
    []
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  return (
    <div>
      {/* Upload Area */}
      <GlassCard
        className={`p-12 text-center cursor-pointer transition-all border-2 border-dashed ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-600 hover:border-blue-500'
        }`}
        variant="subtle"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileInput}
          className="hidden"
          id="pdf-input"
          disabled={uploading}
        />

        <label
          htmlFor="pdf-input"
          className="cursor-pointer block"
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-blue-400" />
          <h3 className="text-xl font-semibold mb-2">Drop your PDFs here</h3>
          <p className="text-text-secondary mb-4">
            or click to browse from your device
          </p>
          <p className="text-sm text-text-secondary">Supported format: PDF</p>
        </label>
      </GlassCard>

      {/* Progress Bar */}
      {uploading && uploadProgress > 0 && (
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Uploading...</span>
            <span className="text-sm font-semibold">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-700/30 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Upload History</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30"
              >
                <FileText className="w-5 h-5 text-blue-400" />
                <span className="flex-1 truncate">{file.name}</span>
                {file.status === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                {file.status === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
                {file.status === 'processing' && (
                  <div className="w-5 h-5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
