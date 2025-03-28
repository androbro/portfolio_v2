"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Experience data
const experiences = [
	{
		company: "Strativ AB",
		position: "Software Engineer (Frontend)",
		period: "Dec 2024 - Present",
		description:
			"Leading front-end development for multiple client projects using React, Next.js, and TypeScript.",
	},
	{
		company: "Epikcoders",
		position: "Frontend Developer",
		period: "Oct 2023 - Nov 2024",
		description:
			"Developed responsive web applications with React and implemented animations using GSAP.",
	},
	{
		company: "Anchorblock Technology",
		position: "Frontend Engineer",
		period: "Oct 2022 - Sep 2023",
		description:
			"Built UI components and integrated APIs for e-commerce platforms using React and Redux.",
	},
	{
		company: "Branex IT",
		position: "Frontend Developer (Part-time)",
		period: "Jan 2022 - Oct 2022",
		description:
			"Created interactive landing pages and implemented responsive designs using HTML, CSS, and JavaScript.",
	},
];

export function Experience() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const timelineRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// GSAP animation for heading and timeline items
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 70%",
			},
		});

		tl.fromTo(headingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

		// Animate timeline items
		const timelineItems = document.querySelectorAll(".timeline-item");
		timelineItems.forEach((item, index) => {
			gsap.fromTo(
				item,
				{
					x: index % 2 === 0 ? -30 : 30,
					opacity: 0,
				},
				{
					x: 0,
					opacity: 1,
					duration: 0.6,
					delay: 0.2 + index * 0.1,
					scrollTrigger: {
						trigger: timelineRef.current,
						start: "top 80%",
					},
				}
			);
		});
	}, []);

	return (
		<section ref={sectionRef} id="experience" className="py-24">
			<div className="container mx-auto px-4">
				<h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-16 text-center">
					My Experience
				</h2>

				<div ref={timelineRef} className="relative max-w-3xl mx-auto">
					{/* Timeline line */}
					<div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200" />

					{/* Timeline items */}
					{experiences.map((exp, index) => (
						<div
							key={exp.company}
							className={`timeline-item relative mb-12 ${
								index % 2 === 0
									? "md:pr-8 md:ml-auto md:mr-auto md:text-right"
									: "md:pl-8 md:ml-auto md:mr-auto md:text-left"
							} md:w-[45%] ${index % 2 === 0 ? "md:left-0" : "md:left-[50%]"}`}
						>
							{/* Timeline dot */}
							<div className="absolute top-5 left-1/2 transform -translate-x-1/2 md:left-auto md:right-0 md:translate-x-1/2 w-4 h-4 rounded-full bg-black" />

							<div className="bg-white p-6 rounded-lg shadow-sm">
								<h3 className="text-xl font-semibold mb-1">{exp.position}</h3>
								<div className="text-lg font-medium mb-2 text-gray-700">{exp.company}</div>
								<div className="text-sm mb-3 text-gray-500">{exp.period}</div>
								<p className="text-gray-600">{exp.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
