"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const emailRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		// GSAP animation for contact section elements
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 70%",
			},
		});

		tl.fromTo(
			headingRef.current,
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.6 }
		).fromTo(emailRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
	}, []);

	return (
		<section ref={sectionRef} id="contact" className="py-24">
			<div className="container mx-auto px-4 text-center">
				<h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-8">
					Have a project in mind?
				</h2>
				<a
					ref={emailRef}
					href="mailto:youremail@example.com"
					className="inline-block text-xl md:text-2xl font-medium text-gray-700 hover:text-black transition-colors"
				>
					youremail@example.com
				</a>
			</div>
		</section>
	);
}
