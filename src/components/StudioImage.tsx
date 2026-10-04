import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { STUDIO_IMAGES, BUNDLED_FALLBACK_IMAGES } from '../data/studioData';

export const ARTIST_PHOTO_STORAGE_KEY = 'guruart_main_artist_photo';
export const ARTIST_PHOTO_EVENT = 'guruart-artist-photo-updated';

export function getStoredArtistPhoto(): string | null {
  try {
    return localStorage.getItem(ARTIST_PHOTO_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredArtistPhoto(dataUrl: string | null): void {
  try {
    if (dataUrl) {
      localStorage.setItem(ARTIST_PHOTO_STORAGE_KEY, dataUrl);
    } else {
      localStorage.removeItem(ARTIST_PHOTO_STORAGE_KEY);
    }
  } catch {
    // Ignore storage quota errors
  }
  window.dispatchEvent(new CustomEvent(ARTIST_PHOTO_EVENT, { detail: dataUrl }));
}

function withBaseUrl(rawPath: string): string {
  if (
    !rawPath ||
    rawPath.startsWith('data:') ||
    rawPath.startsWith('http://') ||
    rawPath.startsWith('https://') ||
    rawPath.startsWith('blob:')
  ) {
    return rawPath;
  }
  const baseUrl = import.meta.env.BASE_URL || '/';
  if (rawPath.startsWith(baseUrl)) {
    return rawPath;
  }
  const cleanRelative = rawPath.replace(/^\/+/, '');
  return `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}${cleanRelative}`;
}

interface StudioImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

const ARTIST_AT_WORK_PATHS = new Set([
  STUDIO_IMAGES.artistAtWork,
  '/MUKESH ARTIST.jpeg',
  'MUKESH ARTIST.jpeg',
  '/src/assets/images/MUKESH ARTIST.jpeg',
  '/src/assets/images/artist_at_work_1791097286180.jpg',
]);

const MUKESH_PAINTING_PATHS = new Set([
  STUDIO_IMAGES.igKidsRoomMural,
  'MUKESH PAINTING.jpg',
  '/MUKESH PAINTING.jpg',
  '/src/assets/images/MUKESH PAINTING.jpg',
]);

export const StudioImage: React.FC<StudioImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  loading = 'lazy',
}) => {
  const isArtistAtWorkSlot = ARTIST_AT_WORK_PATHS.has(src);
  const isMukeshPaintingSlot = MUKESH_PAINTING_PATHS.has(src);

  const [customArtistPhoto, setCustomArtistPhoto] = useState<string | null>(() =>
    isArtistAtWorkSlot ? getStoredArtistPhoto() : null
  );
  const [fallbackStep, setFallbackStep] = useState<number>(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setFallbackStep(0);
    setHasError(false);
    if (ARTIST_AT_WORK_PATHS.has(src)) {
      setCustomArtistPhoto(getStoredArtistPhoto());
    }
  }, [src]);

  useEffect(() => {
    if (!isArtistAtWorkSlot) return;
    const handlePhotoUpdate = () => {
      setCustomArtistPhoto(getStoredArtistPhoto());
      setFallbackStep(0);
      setHasError(false);
    };
    window.addEventListener(ARTIST_PHOTO_EVENT, handlePhotoUpdate);
    return () => window.removeEventListener(ARTIST_PHOTO_EVENT, handlePhotoUpdate);
  }, [isArtistAtWorkSlot]);

  const resolveEffectiveSrc = (): string => {
    if (isArtistAtWorkSlot) {
      if (customArtistPhoto) return customArtistPhoto;
      if (fallbackStep === 0) return withBaseUrl('MUKESH ARTIST.jpeg');
      if (fallbackStep === 1) return withBaseUrl('src/assets/images/MUKESH ARTIST.jpeg');
      return BUNDLED_FALLBACK_IMAGES.artistAtWork;
    }

    if (isMukeshPaintingSlot) {
      if (fallbackStep === 0) return withBaseUrl('MUKESH PAINTING.jpg');
      if (fallbackStep === 1) return withBaseUrl('src/assets/images/MUKESH PAINTING.jpg');
      return BUNDLED_FALLBACK_IMAGES.igKidsRoomMural;
    }

    return withBaseUrl(src);
  };

  const handleImageError = () => {
    if ((isArtistAtWorkSlot && !customArtistPhoto && fallbackStep < 2) || (isMukeshPaintingSlot && fallbackStep < 2)) {
      setFallbackStep((prev) => prev + 1);
      return;
    }
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#27241D] via-[#1C1A17] to-[#3B2E1E] text-[#F7F5F0] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Palette className="w-8 h-8 text-[#D97706] mb-3 opacity-90" />
        <span className="font-display text-lg font-semibold tracking-wide text-[#F7F5F0]">
          {fallbackTitle || alt}
        </span>
        <span className="text-xs text-[#A8A29E] mt-1">GURUART Handcrafted Original</span>
      </div>
    );
  }

  return (
    <img
      src={resolveEffectiveSrc()}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={handleImageError}
      className={className}
    />
  );
};
