"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Projects data
const projects = [
	{
		id: "01",
		title: "Epikcart",
		tech: ["React", "Redux", "React i18n"],
		image: "/placeholder.jpg",
	},
	{
		id: "02",
		title: "Resume Roaster",
		tech: ["GPT-4", "Next.js", "PostgreSQL"],
		image: "/placeholder.jpg",
	},
	{
		id: "03",
		title: "Real Estate",
		tech: ["React.js", "Redux", "Tailwind CSS"],
		image: "/placeholder.jpg",
	},
	{
		id: "04",
		title: "Consulting Finance",
		tech: ["HTML", "CSS & SCSS", "Javascript"],
		image: "/placeholder.jpg",
	},
	{
		id: "05",
		title: "devLinks",
		tech: ["Next.js", "Formik", "Drag & Drop"],
		image: "/placeholder.jpg",
	},
];

export function Projects() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const projectsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// GSAP animation for heading and project cards
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 70%",
			},
		});

		tl.fromTo(headingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

		// Animate project cards with staggered effect
		const projectCards = document.querySelectorAll(".project-card");
		gsap.fromTo(
			projectCards,
			{ y: 50, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.7,
				stagger: 0.15,
				ease: "power2.out",
				scrollTrigger: {
					trigger: projectsRef.current,
					start: "top 80%",
				},
			}
		);
	}, []);

	return (
		<section ref={sectionRef} id="projects" className="py-24 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-16 text-center">
					Selected Projects
				</h2>

				<div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project) => (
						<div
							key={project.id}
							className="project-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
						>
							<div className="relative h-48 bg-gray-200">
								<div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full text-sm font-medium">
									_{project.id}
								</div>
								{/* Replace with actual images later */}
								<div className="w-full h-full flex items-center justify-center text-gray-500">
									Project Image
								</div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold mb-3">{project.title}</h3>
								<div className="flex flex-wrap gap-2">
									{project.tech.map((tech) => (
										<span
											key={tech}
											className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
