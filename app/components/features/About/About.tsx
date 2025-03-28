"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const textRef = useRef<HTMLParagraphElement>(null);
	const quoteRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const heading = headingRef.current;
		const text = textRef.current;
		const quote = quoteRef.current;

		if (!section || !heading || !text || !quote) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "top center",
				end: "bottom center",
			},
		});

		tl.fromTo(heading, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
			.fromTo(text, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
			.fromTo(quote, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
	}, []);

	return (
		<section ref={sectionRef} id="about" className="flex items-center justify-center py-20">
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div ref={quoteRef}>
					<h3 className="text-4xl md:text-6xl font-light leading-tight mb-22">
						I create meaningful digital experiences that combine aesthetics with functionality and performance.
					</h3>
				</div>
				<div 
					ref={textRef}
					className="grid grid-cols-1 gap-8 text-lg text-white/80"
				>
				<p className="pb-3 border-b text-muted-foreground slide-up-and-fade">About Me</p>
					<div className="flex flex-col md:flex-row gap-8">
						<div className="md:w-1/3">
							<h4 className="text-2xl font-light mb-4">Hi, I'm Koen.</h4>
						</div>
						<div className="md:w-2/3 space-y-6">
							<p className="font-light">
								I'm a frontend developer with experience in building responsive and performant web applications using modern technologies like React, Next.js, and TypeScript.
							</p>
							<p className="font-light">
								My goal is to create clean, efficient code that delivers exceptional user experiences. I'm passionate about continuous learning and staying current with emerging web technologies.
							</p>
							<p className="font-light">
								When I'm not coding, I enjoy exploring new design trends, contributing to open-source projects, and sharing knowledge with the developer community.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
