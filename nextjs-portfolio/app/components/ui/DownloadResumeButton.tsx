"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface DownloadResumeButtonProps {
	variant?: "primary" | "secondary";
	className?: string;
}

export const DownloadResumeButton: React.FC<DownloadResumeButtonProps> = ({
	variant = "primary",
	className = "",
}) => {
	const [isDownloading, setIsDownloading] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [showFrenchCat, setShowFrenchCat] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState("Generating...");
	const [isTranslating, setIsTranslating] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const translationMessages = [
		"Using AI to translate to Dutch... 🤖",
		"Claude is working on your translation... 🧠",
		"Converting to Nederlands... 🇳🇱",
		"AI magic in progress... ✨",
		"Almost there... 📄",
		"Polishing the Dutch translation... 🎨",
	];

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
			if (event.key === "Escape" && showFrenchCat) {
				handleMute();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [showFrenchCat, handleMute]);

	// Rotate loading messages when translating
	useEffect(() => {
		if (!isTranslating) return;

		let messageIndex = 0;
		const interval = setInterval(() => {
			messageIndex = (messageIndex + 1) % translationMessages.length;
			setLoadingMessage(translationMessages[messageIndex]);
		}, 3000); // Change message every 3 seconds

		return () => clearInterval(interval);
	}, [isTranslating, translationMessages]);

	const handleDownload = async (language: string) => {
		setIsDropdownOpen(false);

		if (language === "french") {
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

		// Set translation state for Dutch
		if (language === "dutch") {
			setIsTranslating(true);
			setLoadingMessage(translationMessages[0]);
		} else {
			setLoadingMessage("Generating...");
		}

		try {
			const response = await fetch(`/api/resume?lang=${language}`);

			if (!response.ok) {
				throw new Error("Failed to generate resume");
			}

			// Create a blob from the PDF stream
			const blob = await response.blob();

			// Create a temporary URL for the blob
			const url = window.URL.createObjectURL(blob);

			// Create a temporary anchor element to trigger download
			const a = document.createElement("a");
			a.href = url;
			a.download = `Koen_De_Vulder_Resume_${language.toUpperCase()}.pdf`;
			document.body.appendChild(a);
			a.click();

			// Clean up
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error("Error downloading resume:", error);
			alert("Failed to download resume. Please try again.");
		} finally {
			setIsDownloading(false);
			setIsTranslating(false);
			setLoadingMessage("Generating...");
		}
	};

	const baseStyles =
		"inline-flex items-center justify-center gap-2 px-6 py-3 font-medium transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

	const variantStyles = {
		primary:
			"bg-accent text-background hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-accent/50",
		secondary:
			"border-2 border-accent text-accent hover:bg-accent hover:text-background hover:scale-105 active:scale-95",
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
							<span className="transition-all duration-300">{loadingMessage}</span>
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
							onClick={() => handleDownload("english")}
							className="w-full px-6 py-3 text-left hover:bg-accent hover:text-black transition-colors flex items-center gap-2 font-medium"
						>
							🇬🇧 English
						</button>
						<button
							onClick={() => handleDownload("dutch")}
							className="w-full px-6 py-3 text-left hover:bg-accent hover:text-black transition-colors flex items-center gap-2 border-t border-[#3a3a3a] font-medium"
						>
							🇳🇱 Dutch
						</button>
						<button
							onClick={() => handleDownload("french")}
							className="w-full px-6 py-3 text-left hover:bg-accent hover:text-black transition-colors flex items-center gap-2 border-t border-[#3a3a3a] font-medium"
						>
							🇫🇷 French
						</button>
					</div>
				)}
			</div>

			{/* FRENCH CAT EASTER EGG 🐱🇫🇷 */}
			{showFrenchCat && (
				<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 animate-in fade-in duration-300 cursor-default px-4 py-8 overflow-y-auto">
					<div className="relative flex flex-col items-center gap-4 md:gap-8 p-4 md:p-8 cursor-default max-w-full">
						{/* GIANT MUTE BUTTON */}
						<button
							onClick={handleMute}
							className="absolute top-2 right-2 md:top-0 md:right-0 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 md:px-12 md:py-6 text-lg md:text-3xl animate-pulse border-2 md:border-4 border-red-400 shadow-2xl shadow-red-500/50 transition-all hover:scale-110 cursor-pointer"
							aria-label="STOP THE MUSIC"
						>
							<span className="hidden md:inline">🔇 MUTE THIS CHAOS!</span>
							<span className="md:hidden">🔇 MUTE!</span>
						</button>

						{/* French Cat Image */}
						<div className="mt-12 md:mt-20 animate-in zoom-in duration-700 w-full flex justify-center">
							<img
								src="/frenchCat.png"
								alt="Le Chat Français"
								className="w-full max-w-xs md:max-w-2xl max-h-[40vh] md:max-h-[70vh] object-contain border-4 md:border-8 border-accent shadow-2xl shadow-accent/50"
							/>
						</div>

						{/* Funny Message */}
						<div className="text-center animate-in slide-in-from-bottom duration-700 px-4">
							<h2 className="text-3xl md:text-5xl font-bold text-accent mb-2 md:mb-4 animate-pulse">Ooh là là! 🥐</h2>
							<p className="text-base md:text-2xl text-white/90 font-light">
								I failed French class so hard, they made me retake English!
							</p>
							<p className="text-sm md:text-xl text-white/70 mt-1 md:mt-2">
								My entire French vocabulary: Bonjour, Croissant, and this song 😅
							</p>
						</div>

						{/* Click anywhere to close */}
						<p className="text-xs md:text-sm text-white/50 mt-4 md:absolute md:bottom-4 text-center">
							Click the mute button or press Escape to save your ears
						</p>
					</div>
				</div>
			)}

			{/* Hidden audio element */}
			<audio ref={audioRef} src="/french-meme-song.mp3" loop onEnded={handleMute} />
		</>
	);
};
