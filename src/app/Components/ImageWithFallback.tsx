// components/ImageWithFallback.tsx
'use client';
import { useState } from 'react';

export default function ImageWithFallback({
  src,
  alt,
  className,
  // fallbackSrc = '/Image/placeholder-image.jpg'
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}) {
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {error ? (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}