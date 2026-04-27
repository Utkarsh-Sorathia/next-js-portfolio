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
  roundedClass?: string;
  blurDataURL?: string;
}

export default function BlogImageWithLoader({
  src,
  alt,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw',
  roundedClass = 'rounded-[var(--borderRadius)]',
  blurDataURL,
}: BlogImageWithLoaderProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading Shimmer (only if no blur data URL) */}
      {imageLoading && !imageError && !blurDataURL && (
        <div className={`absolute inset-0 image-shimmer bg-gray-700 ${roundedClass}`} />
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${roundedClass} ${
          imageLoading && !blurDataURL ? 'opacity-0' : 'opacity-100'
        }`}
        quality={quality}
        priority={priority}
        sizes={sizes}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        onLoad={handleImageLoad}
        onError={() => {
          setImageLoading(false);
          setImageError(true);
        }}
      />

      {/* Error Fallback */}
      {imageError && (
        <div className={`absolute inset-0 bg-gray-800 flex items-center justify-center ${roundedClass}`}>
          <div className="text-gray-400 text-6xl">📝</div>
        </div>
      )}
    </div>
  );
}

