'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  width = 500,
  height = 300,
  fallbackSrc = '/placeholder-image.jpg'
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        onError={() => {
          console.warn(`Image load failed: ${src}`);
          setError(true);
        }}
      />
    </div>
  );
}