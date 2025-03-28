"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Define tech stack categories and items
const techStack = {
	frontend: [
		{ name: "Javascript", icon: "💻" },
		{ name: "Typescript", icon: "📝" },
		{ name: "React", icon: "⚛️" },
		{ name: "Next.js", icon: "🔲" },
		{ name: "Redux", icon: "🔄" },
		{ name: "Tailwind CSS", icon: "🎨" },
		{ name: "GSAP", icon: "✨" },
		{ name: "Framer Motion", icon: "🎭" },
		{ name: "SASS", icon: "💅" },
		{ name: "Bootstrap", icon: "🅱️" },
	],
	backend: [
		{ name: "Node.js", icon: "🟢" },
		{ name: "Nest.js", icon: "🐈" },
		{ name: "Express.js", icon: "🚂" },
	],
	database: [
		{ name: "MySQL", icon: "🐬" },
		{ name: "PostgreSQL", icon: "🐘" },
		{ name: "MongoDB", icon: "🍃" },
		{ name: "Prisma", icon: "🔺" },
	],
	tools: [
		{ name: "Git", icon: "🔄" },
		{ name: "Docker", icon: "🐳" },
		{ name: "AWS", icon: "☁️" },
	],
};

export function TechStack() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		// GSAP animation for staggered tech items appearance
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 70%",
			},
		});

		tl.fromTo(headingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

		// Animate tech items with staggered effect
		const categories = document.querySelectorAll(".tech-category");
		categories.forEach((category, i) => {
			const techItems = document.querySelectorAll(`.tech-category-${i} .tech-item`);

			gsap.fromTo(
				techItems,
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.4,
					stagger: 0.1,
					scrollTrigger: {
						trigger: category,
						start: "top 80%",
					},
				}
			);
		});
	}, []);

	return (
		<section ref={sectionRef} id="stack" className="py-24 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-16 text-center">
					My Stack
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
					{/* Frontend */}
					<div className="tech-category tech-category-0">
						<h3 className="text-2xl font-semibold mb-6 text-gray-700">frontend</h3>
						<div className="grid grid-cols-2 gap-4">
							{techStack.frontend.map((tech) => (
								<div key={tech.name} className="tech-item flex items-center gap-3 p-3 rounded-md">
									<span className="text-2xl">{tech.icon}</span>
									<span className="text-lg">{tech.name}</span>
								</div>
							))}
						</div>
					</div>

					{/* Backend */}
					<div className="tech-category tech-category-1">
						<h3 className="text-2xl font-semibold mb-6 text-gray-700">backend</h3>
						<div className="grid grid-cols-2 gap-4">
							{techStack.backend.map((tech) => (
								<div key={tech.name} className="tech-item flex items-center gap-3 p-3 rounded-md">
									<span className="text-2xl">{tech.icon}</span>
									<span className="text-lg">{tech.name}</span>
								</div>
							))}
						</div>
					</div>

					{/* Database */}
					<div className="tech-category tech-category-2">
						<h3 className="text-2xl font-semibold mb-6 text-gray-700">database</h3>
						<div className="grid grid-cols-2 gap-4">
							{techStack.database.map((tech) => (
								<div key={tech.name} className="tech-item flex items-center gap-3 p-3 rounded-md">
									<span className="text-2xl">{tech.icon}</span>
									<span className="text-lg">{tech.name}</span>
								</div>
							))}
						</div>
					</div>

					{/* Tools */}
					<div className="tech-category tech-category-3">
						<h3 className="text-2xl font-semibold mb-6 text-gray-700">tools</h3>
						<div className="grid grid-cols-2 gap-4">
							{techStack.tools.map((tech) => (
								<div key={tech.name} className="tech-item flex items-center gap-3 p-3 rounded-md">
									<span className="text-2xl">{tech.icon}</span>
									<span className="text-lg">{tech.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
