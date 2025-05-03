// components/DirectVideoUpload.tsx
'use client';
import { useState, useRef, ChangeEvent } from 'react';
import { Trash2, UploadCloud, Video } from 'lucide-react';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';

interface DirectVideoUploadProps {
  onUpload: (url: string) => void;
  onRemove: () => void;
  existingVideo?: string;
}

export default function DirectVideoUpload({
  onUpload,
  onRemove,
  existingVideo,
}: DirectVideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    if (existingVideo) {
      setError('Only one video is allowed');
      return;
    }

    const file = e.target.files[0];
    
    // Validate file type
    if (!file.type.includes('video')) {
      setError('Only video files are allowed');
      return;
    }

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      setError('Video too large (max 50MB)');
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
      setError(err instanceof Error ? err.message : 'Video upload failed');
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
        accept="video/*"
        className="hidden"
        disabled={uploading || !!existingVideo}
      />

      {existingVideo ? (
        <div className="relative group">
          <div className="h-40 w-full rounded-lg bg-gray-200 flex items-center justify-center">
            <Video className="h-10 w-10 text-gray-500" />
            <p className="ml-2 text-sm text-gray-600">Video uploaded</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onRemove();
              setError(null);
            }}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-100 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`w-full border-2 border-dashed rounded-lg p-8 text-center ${
            uploading ? 'bg-gray-100 cursor-wait' : 'cursor-pointer hover:border-blue-500'
          } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Video className={`mx-auto h-12 w-12 ${
            uploading ? 'text-blue-500 animate-pulse' : 'text-gray-400'
          }`} />
          <p className="mt-2 text-sm text-gray-600">
            {uploading ? `Uploading... ${progress}%` : 'Click to upload video'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            MP4, MOV (Max 50MB)
          </p>
        </button>
      )}

      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}