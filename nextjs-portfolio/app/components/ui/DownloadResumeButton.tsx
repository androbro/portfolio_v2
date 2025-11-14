'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface DownloadResumeButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const DownloadResumeButton: React.FC<DownloadResumeButtonProps> = ({
  variant = 'primary',
  className = '',
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showFrenchCat, setShowFrenchCat] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setShowFrenchCat(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showFrenchCat) {
        handleMute();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showFrenchCat, handleMute]);

  const handleDownload = async (language: string) => {
    setIsDropdownOpen(false);

    if (language === 'french') {
      // SURPRISE! 🇫🇷
      setShowFrenchCat(true);
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play();
      }
      return;
    }

    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const response = await fetch('/api/resume');

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      // Create a blob from the PDF stream
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `Koen_De_Vulder_Resume_${language.toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-6 py-3 font-medium transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-accent text-background hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-accent/50',
    secondary:
      'border-2 border-accent text-accent hover:bg-accent hover:text-background hover:scale-105 active:scale-95',
  };

  return (
    <>
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={isDownloading}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
          aria-label="Download Resume PDF"
        >
          {isDownloading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <span>Download Resume</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </>
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full mt-2 left-0 bg-[#2a2a2a] border-2 border-accent shadow-lg z-50 min-w-full">
            <button
              onClick={() => handleDownload('english')}
              className="w-full px-6 py-3 text-left hover:bg-accent hover:text-black transition-colors flex items-center gap-2 font-medium"
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => handleDownload('dutch')}
              className="w-full px-6 py-3 text-left hover:bg-accent hover:text-black transition-colors flex items-center gap-2 border-t border-[#3a3a3a] font-medium"
            >
              🇳🇱 Dutch
            </button>
            <button
              onClick={() => handleDownload('french')}
              className="w-full px-6 py-3 text-left hover:bg-accent hover:text-black transition-colors flex items-center gap-2 border-t border-[#3a3a3a] font-medium"
            >
              🇫🇷 French
            </button>
          </div>
        )}
      </div>

      {/* FRENCH CAT EASTER EGG 🐱🇫🇷 */}
      {showFrenchCat && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 animate-in fade-in duration-300 cursor-default">
          <div className="relative flex flex-col items-center gap-8 p-8 cursor-default">
            {/* GIANT MUTE BUTTON */}
            <button
              onClick={handleMute}
              className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white font-bold px-12 py-6 text-3xl animate-pulse border-4 border-red-400 shadow-2xl shadow-red-500/50 transition-all hover:scale-110 cursor-pointer"
              aria-label="STOP THE MUSIC"
            >
              🔇 MUTE THIS CHAOS!
            </button>

            {/* French Cat Image */}
            <div className="mt-20 animate-bounce">
              <img
                src="/frenchCat.png"
                alt="Le Chat Français"
                className="max-w-2xl max-h-[70vh] object-contain border-8 border-accent shadow-2xl shadow-accent/50"
              />
            </div>

            {/* Funny Message */}
            <div className="text-center animate-in slide-in-from-bottom duration-700">
              <h2 className="text-5xl font-bold text-accent mb-4 animate-pulse">
                Ooh là là! 🥐
              </h2>
              <p className="text-2xl text-white/90 font-light">
                I failed French class so hard, they made me retake English!
              </p>
              <p className="text-xl text-white/70 mt-2">
                My entire French vocabulary: Bonjour, Croissant, and this song 😅
              </p>
            </div>

            {/* Click anywhere to close */}
            <p className="text-sm text-white/50 absolute bottom-4">
              Click the mute button or press Escape to save your ears
            </p>
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/french-meme-song.mp3"
        loop
        onEnded={handleMute}
      />
    </>
  );
};
