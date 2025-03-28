"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const textRef = useRef<HTMLParagraphElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// GSAP animation for text and image fade-in on scroll
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 70%",
			},
		});

		tl.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
			.fromTo(textRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
			.fromTo(
				imageRef.current,
				{ x: 30, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.6 },
				"-=0.4"
			);
	}, []);

	return (
		<section ref={sectionRef} id="about" className="py-24">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
					<div>
						<h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-8">
							About Me
						</h2>
						<p ref={textRef} className="text-lg leading-relaxed mb-6">
							I'm a frontend web developer dedicated to turning ideas into creative solutions. I
							specialize in creating seamless and intuitive user experiences.
						</p>
						<p className="text-lg leading-relaxed">
							My approach focuses on creating scalable, high-performing solutions tailored to both
							user needs and business objectives. By prioritizing performance, accessibility, and
							responsiveness, I strive to deliver experiences that not only engage users but also
							drive tangible results.
						</p>
					</div>
					<div
						ref={imageRef}
						className="bg-gray-200 rounded-lg h-80 flex items-center justify-center"
					>
						<span className="text-gray-500">Your profile image here</span>
					</div>
				</div>
			</div>
		</section>
	);
}
