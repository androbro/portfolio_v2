"use client";

import { useEffect, useRef } from "react";

export function BackgroundStars() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Create 50 stars with random positions and durations
		for (let i = 0; i < 50; i++) {
			const star = document.createElement("div");
			star.classList.add("star");

			// Random horizontal position
			const posX = Math.random() * 100;
			star.style.left = `${posX}%`;

			// Random animation duration between 10 and 30 seconds
			const duration = 10 + Math.random() * 20;
			star.style.animationDuration = `${duration}s`;

			// Random delay to stagger the stars
			const delay = Math.random() * 30;
			star.style.animationDelay = `${delay}s`;

			container.appendChild(star);
		}

		return () => {
			// Cleanup stars on unmount
			while (container.firstChild) {
				container.removeChild(container.firstChild);
			}
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 pointer-events-none overflow-hidden z-0"
			aria-hidden="true"
		/>
	);
}
