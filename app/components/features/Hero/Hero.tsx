"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export function Hero() {
	const headingRef = useRef<HTMLHeadingElement>(null);
	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const experienceRef = useRef<HTMLDivElement>(null);
	const projectsRef = useRef<HTMLDivElement>(null);
	const hoursRef = useRef<HTMLDivElement>(null);
	const cursorRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Custom cursor
	useEffect(() => {
		const cursor = cursorRef.current;
		if (!cursor) return;

		const onMouseMove = (e: MouseEvent) => {
			gsap.to(cursor, {
				x: e.clientX,
				y: e.clientY,
				duration: 0.15,
				ease: "power2.out",
			});
		};

		window.addEventListener("mousemove", onMouseMove);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, []);

	// Create stars
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
	}, []);

	// GSAP animations
	useEffect(() => {
		// GSAP animation for text fade-in
		const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

		tl.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
			.fromTo(
				paragraphRef.current,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8 },
				"-=0.4"
			)
			.fromTo(
				buttonRef.current,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.6 },
				"-=0.2"
			)
			.fromTo(
				[experienceRef.current, projectsRef.current, hoursRef.current],
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
				"-=0.3"
			);
	}, []);

	return (
		<>
			<div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" />
			<div ref={cursorRef} className="custom-cursor" />

			<section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center md:items-start">
						<h1 ref={headingRef} className="text-5xl md:text-7xl font-bold mb-6">
							<span className="text-accent">FRONTEND</span>
							<br />
							DEVELOPER
						</h1>
						<p ref={paragraphRef} className="text-lg md:text-xl max-w-2xl mb-8 text-white/80">
							Hi! I'm Koen De Vulder. A creative Frontend Developer with 3+ years of experience in
							building high-performance, scalable, and responsive web solutions.
						</p>
						<button
							ref={buttonRef}
							type="button"
							className="bg-accent text-black px-8 py-3 font-medium hover:bg-accent/90 transition-colors"
						>
							HIRE ME
						</button>
					</div>
				</div>

				{/* Stats */}
				<div className="fixed bottom-8 right-8 space-y-4 text-right">
					<div ref={experienceRef} className="flex flex-col">
						<span className="text-3xl md:text-4xl text-accent font-bold">3+</span>
						<span className="text-sm text-white/60">Years of Experience</span>
					</div>
					<div ref={projectsRef} className="flex flex-col">
						<span className="text-3xl md:text-4xl text-accent font-bold">7+</span>
						<span className="text-sm text-white/60">Completed Projects</span>
					</div>
					<div ref={hoursRef} className="flex flex-col">
						<span className="text-3xl md:text-4xl text-accent font-bold">10k+</span>
						<span className="text-sm text-white/60">Hours Worked</span>
					</div>
				</div>
			</section>
		</>
	);
}
