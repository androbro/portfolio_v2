'use client';

import { useState } from 'react';

interface DownloadResumeButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const DownloadResumeButton: React.FC<DownloadResumeButtonProps> = ({
  variant = 'primary',
  className = '',
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
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
      a.download = 'Koen_De_Vulder_Resume.pdf';
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
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-accent text-background hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-accent/50',
    secondary:
      'border-2 border-accent text-accent hover:bg-accent hover:text-background hover:scale-105 active:scale-95',
  };

  return (
    <button
      onClick={handleDownload}
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
        </>
      )}
    </button>
  );
};
