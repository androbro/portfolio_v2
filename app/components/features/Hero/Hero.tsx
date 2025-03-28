"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export function Hero() {
	const headingRef = useRef<HTMLHeadingElement>(null);
	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

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
			);
	}, []);

	return (
		<section id="hero" className="min-h-screen flex items-center justify-center pt-20">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center md:items-start">
					<h1 ref={headingRef} className="text-5xl md:text-7xl font-bold mb-6">
						FRONTEND
						<br />
						DEVELOPER
					</h1>
					<p ref={paragraphRef} className="text-lg md:text-xl max-w-2xl mb-8">
						Hi! I'm Koen De Vulder. A creative Frontend Developer with experience in building
						high-performance, scalable, and responsive web solutions.
					</p>
					<button
						ref={buttonRef}
						type="button"
						className="bg-black text-white px-8 py-3 rounded-full"
					>
						Hire Me
					</button>
				</div>
			</div>
		</section>
	);
}
