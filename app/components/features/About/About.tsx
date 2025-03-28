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
		<section ref={sectionRef} id="about" className="min-h-screen flex items-center justify-center py-20">
			<div className="container px-4">
				<div className="max-w-4xl ">
					<div ref={quoteRef} className="mb-20">
						<h3 className="text-4xl md:text-5xl font-light leading-tight">
							I believe in a user centered design approach, ensuring that every project I work on is
							tailored to meet the specific needs of its users.
						</h3>
					</div>
					<div
						ref={textRef}
						className="grid grid-cols-1 gap-8 text-lg text-white/80"
					>
					<p className="pb-3 border-b text-muted-foreground slide-up-and-fade">This is me.</p>
						<div className="flex flex-col md:flex-row gap-8">
							<div className="md:w-1/3">
								<h4 className="text-2xl font-light mb-4">Hi, I'm Tajmirul.</h4>
							</div>
							<div className="md:w-2/3 space-y-6">
								<p className="font-light">
									I'm a frontend web developer dedicated to turning ideas into creative solutions. I
									specialize in creating seamless and intuitive user experiences.
								</p>
								<p className="font-light">
									My approach focuses on creating scalable, high-performing solutions tailored to both
									user needs and business objectives. By prioritizing performance, accessibility, and
									responsiveness, I strive to deliver experiences that not only engage users but also
									drive tangible results.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
