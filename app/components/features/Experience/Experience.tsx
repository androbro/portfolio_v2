"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
	{
		company: "Strativ AB",
		position: "Software Engineer (Frontend)",
		period: "Dec 2024 - Present",
	},
	{
		company: "Epikcoders",
		position: "Frontend Developer",
		period: "Oct 2023 - Nov 2024",
	},
	{
		company: "Anchorblock Technology",
		position: "Frontend Engineer",
		period: "Oct 2022 - Sep 2023",
	},
	{
		company: "Branex IT",
		position: "Frontend Developer (Part-time)",
		period: "Jan 2022 - Oct 2022",
	},
];

export function Experience() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const section = sectionRef.current;
		const heading = headingRef.current;
		const items = experienceRefs.current;

		if (!section || !heading || items.some((item) => !item)) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "top center",
				end: "bottom center",
			},
		});

		tl.fromTo(heading, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }).fromTo(
			items,
			{ y: 50, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.2,
			},
			"-=0.3"
		);
	}, []);

	return (
		<section ref={sectionRef} id="experience" className="min-h-screen flex items-center py-20">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl">
					<div className="flex items-center gap-4 mb-16">
						<span className="text-accent text-5xl">*</span>
						<h2 ref={headingRef} className="text-2xl uppercase">
							My Experience
						</h2>
					</div>

					<div className="space-y-12">
						{experiences.map((exp, index) => {
							const setRef = (el: HTMLDivElement | null) => {
								experienceRefs.current[index] = el;
							};

							return (
								<div key={exp.company} ref={setRef} className="group">
									<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
										<h3 className="text-4xl md:text-5xl font-normal group-hover:text-accent transition-colors">
											{exp.position}
										</h3>
										<span className="text-white/60">{exp.period}</span>
									</div>
									<span className="text-xl text-white/80">{exp.company}</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
