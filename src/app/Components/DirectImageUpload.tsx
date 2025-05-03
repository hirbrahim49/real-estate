// components/DirectImageUpload.tsx
'use client';
import { useState, useRef, ChangeEvent } from 'react';
import { Trash2, UploadCloud } from 'lucide-react';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';
import ImageWithFallback from './ImageWithFallback';

interface DirectImageUploadProps {
  onUpload: (url: string) => void;
  onRemove: (url: string) => void;
  existingImages?: string[];
  maxFiles?: number;
}

export default function DirectImageUpload({
  onUpload,
  onRemove,
  existingImages = [],
  maxFiles = 3,
}: DirectImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    if (existingImages.length >= maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return;
    }

    const file = e.target.files[0];

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large (max 5MB)');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const result = await uploadToCloudinary(file, (percent) => {
        setProgress(percent);
      });
      onUpload(result.secure_url);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={uploading}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading || existingImages.length >= maxFiles}
        className={`w-full border-2 border-dashed rounded-lg p-8 text-center ${
          uploading ? 'bg-gray-100 cursor-wait' : 'cursor-pointer hover:border-blue-500'
        } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <UploadCloud
          className={`mx-auto h-12 w-12 ${
            uploading ? 'text-blue-500 animate-pulse' : 'text-gray-400'
          }`}
        />
        <p className="mt-2 text-sm text-gray-600">
          {uploading ? `Uploading... ${progress}%` : 'Click to upload images'}
        </p>
        <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP (Max 5MB)</p>
      </button>

      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded text-sm">{error}</div>
      )}

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {existingImages.map((url) => (
          <div key={url} className="relative group">
            {/*
              Replace your img element with:
            */}
            <ImageWithFallback
              src={url}
              alt="Upload preview"
              className="h-32 w-full rounded-lg"
            />
            <button
              type="button"
              onClick={() => onRemove(url)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
