"use client";

import { gsap } from "gsap";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export function Hero() {
	const headingRef = useRef<HTMLHeadingElement>(null);
	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const experienceRef = useRef<HTMLDivElement>(null);
	const projectsRef = useRef<HTMLDivElement>(null);
	const hoursRef = useRef<HTMLDivElement>(null);

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
				[experienceRef.current, projectsRef.current, hoursRef.current],
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
				"-=0.3"
			);
	}, []);

	return (
		<section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative">
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="flex flex-col items-center md:items-start">
					<h1 ref={headingRef} className="text-5xl md:text-7xl font-light mb-6">
						<span className="text-accent">FRONTEND</span>
						<br />
						DEVELOPER
					</h1>
					<p
						ref={paragraphRef}
						className="text-lg md:text-lg max-w-3xl mb-8 text-white/70 font-thin"
					>
						Hi! I'm Koen De Vulder. A creative Frontend Developer with a passion for building innovative, responsive, and user-friendly web applications.
					</p>
					<motion.a
						href="#contact"
						className="bg-accent text-black px-8 py-3 font-light"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						whileHover={{ 
							backgroundColor: "rgba(220, 220, 220, 1)",
							scale: 1.05
						}}
						whileTap={{ 
							backgroundColor: "rgba(255, 255, 255, 1)",
							scale: 0.98
						}}
					>
						CONTACT ME
					</motion.a>

					{/* Stats */}
					<div className="absolute bottom-8 right-8 space-y-4 text-right">
						<div ref={experienceRef} className="flex flex-col">
							<span className="text-3xl md:text-4xl text-accent font-light">3+</span>
							<span className="text-sm text-white/60">Years of Experience</span>
						</div>
						<div ref={projectsRef} className="flex flex-col">
							<span className="text-3xl md:text-4xl text-accent font-light">10+</span>
							<span className="text-sm text-white/60">Completed Projects</span>
						</div>
						<div ref={hoursRef} className="flex flex-col">
							<span className="text-3xl md:text-4xl text-accent font-light">5000+</span>
							<span className="text-sm text-white/60">Hours Coded</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
