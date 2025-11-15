'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BlogImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export default function BlogImageWithLoader({
  src,
  alt,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw',
}: BlogImageWithLoaderProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Loading Shimmer */}
      {imageLoading && !imageError && (
        <div className="absolute inset-0 image-shimmer bg-gray-700 rounded-[var(--borderRadius)]" />
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover rounded-[var(--borderRadius)] transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        quality={quality}
        priority={priority}
        sizes={sizes}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageLoading(false);
          setImageError(true);
        }}
      />

      {/* Error Fallback */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-800 rounded-[var(--borderRadius)] flex items-center justify-center">
          <div className="text-gray-400 text-6xl">📝</div>
        </div>
      )}
    </div>
  );
}

