"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
	{
		title: "E-commerce Platform",
		description: "A modern e-commerce solution built with Next.js and Stripe",
		link: "#",
		tech: "Next.js, TypeScript, Stripe",
	},
	{
		title: "Task Management App",
		description: "Real-time task management with collaborative features",
		link: "#",
		tech: "React, Firebase, TailwindCSS",
	},
	{
		title: "Portfolio Website",
		description: "Personal portfolio with smooth animations and interactions",
		link: "#",
		tech: "Next.js, GSAP, Framer Motion",
	},
];

export function Projects() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const section = sectionRef.current;
		const heading = headingRef.current;
		const items = projectRefs.current;

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
		<section ref={sectionRef} id="projects" className="min-h-screen flex items-center py-20">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl">
					<div className="flex items-center gap-4 mb-16">
						<span className="text-accent text-5xl">*</span>
						<h2 ref={headingRef} className="text-2xl uppercase">
							Selected Projects
						</h2>
					</div>

					<div className="space-y-12">
						{projects.map((project, index) => (
							<div
								key={project.title}
								ref={(el) => (projectRefs.current[index] = el)}
								className="group"
							>
								<div className="flex flex-col gap-4 mb-2">
									<h3 className="text-4xl md:text-5xl font-normal group-hover:text-accent transition-colors">
										{project.title}
									</h3>
									<p className="text-xl text-white/80">{project.description}</p>
									<span className="text-white/60">{project.tech}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
