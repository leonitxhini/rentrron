'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'light';
}

export function Logo({ className = '', showText = true, size = 'md', variant = 'default' }: LogoProps) {
  const isLight = variant === 'light';
  const [currentSrc, setCurrentSrc] = useState('/logo/logo.svg');
  const [hasError, setHasError] = useState(false);

  // Fallback-Reihenfolge: SVG -> PNG -> Text
  const logoSources = ['/logo/logo.svg', '/logo/logo.png'];

  const handleError = () => {
    const currentIndex = logoSources.indexOf(currentSrc);
    if (currentIndex < logoSources.length - 1) {
      // Versuche nächstes Format
      setCurrentSrc(logoSources[currentIndex + 1]);
    } else {
      // Alle Formate fehlgeschlagen, verwende Text-Fallback
      setHasError(true);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {hasError ? (
        // Text-Fallback wenn kein Logo gefunden wird
        <div className={`${sizeClasses[size]} rounded-lg bg-dark flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-bold text-xl">R</span>
        </div>
      ) : (
        <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
          <Image
            src={currentSrc}
            alt="RRON Rent A Car Logo"
            fill
            className="object-contain"
            onError={handleError}
            priority
            unoptimized={currentSrc.endsWith('.svg')}
          />
        </div>
      )}
      {showText && (
        <span className={`${textSizes[size]} font-bold ${isLight ? 'text-white' : 'text-dark'}`}>
          <span className="text-accent">RRON</span> <span className={isLight ? 'text-white/80' : 'text-gray-800'}>Rent A Car</span>
        </span>
      )}
    </Link>
  );
}

