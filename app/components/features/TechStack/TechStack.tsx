"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import JavaScript from "../../../assets/icons/Javascript";

gsap.registerPlugin(ScrollTrigger);

// Define tech stack categories and items
const techStack = {
	frontend: [
		{ name: "HTML", icon: "🌐" },
		{ name: "CSS", icon: "🎨" },
		{ name: "JavaScript", Icon: JavaScript },
		{ name: "TypeScript", icon: "📝" },
		{ name: "React", icon: "⚛️" },
		{ name: "Next.js", icon: "🔲" },
		{ name: "Redux", icon: "🔄" },
		{ name: "Tailwind CSS", icon: "💨" },
		{ name: "GSAP", icon: "✨" },
		{ name: "Motion", icon: "🎭" },
		{ name: "SASS", icon: "💅" },
	],
	backend: [
		{ name: "Node.js", icon: "🟢" },
		{ name: "Express.js", icon: "🚂" },
		{ name: "Firebase", icon: "🔥" },
		{ name: "RESTful APIs", icon: "🔌" },
	],
	database: [
		{ name: "MongoDB", icon: "🍃" },
		{ name: "MySQL", icon: "🐬" },
		{ name: "Supabase", icon: "⚡" },
	],
	tools: [
		{ name: "Git", icon: "🔄" },
		{ name: "GitHub", icon: "🐙" },
		{ name: "VS Code", icon: "📝" },
		{ name: "Figma", icon: "🎨" },
		{ name: "Jest", icon: "🃏" },
		{ name: "Webpack", icon: "📦" },
		{ name: "Vite", icon: "⚡" },
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
		<section ref={sectionRef} id="skills" className="flex items-center justify-center py-20">
			<div className="content-container">
				<div className="flex items-center gap-4 mb-16">
					<span className="text-accent text-5xl">*</span>
					<motion.h2
						ref={headingRef}
						className="text-2xl uppercase"
						initial={{ y: 50, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: false }}
					>
						My Tech Stack
					</motion.h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
					{/* Frontend */}
					<div className="tech-category tech-category-0">
						<h3 className="text-2xl font-light mb-6 text-accent">Frontend</h3>
						<div className="grid grid-cols-2 gap-4">
							{techStack.frontend.map((tech) => (
								<div key={tech.name} className="tech-item flex items-center gap-3 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
									{tech.Icon ? (
										<tech.Icon className="w-6 h-6" />
									) : (
										<span className="text-2xl">{tech.icon}</span>
									)}
									<span className="text-lg font-light">{tech.name}</span>
								</div>
							))}
						</div>
					</div>

					{/* Backend */}
					<div className="tech-category tech-category-1">
						<h3 className="text-2xl font-light mb-6 text-accent">Backend</h3>
						<div className="grid grid-cols-2 gap-4">
							{techStack.backend.map((tech) => (
								<div key={tech.name} className="tech-item flex items-center gap-3 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
									<span className="text-2xl">{tech.icon}</span>
									<span className="text-lg font-light">{tech.name}</span>
								</div>
							))}
						</div>
					</div>

					{/* Database */}
					<div className="tech-category tech-category-2">
						<h3 className="text-2xl font-light mb-6 text-accent">Database</h3>
						<div className="grid grid-cols-2 gap-4">
							{techStack.database.map((tech) => (
								<div key={tech.name} className="tech-item flex items-center gap-3 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
									<span className="text-2xl">{tech.icon}</span>
									<span className="text-lg font-light">{tech.name}</span>
								</div>
							))}
						</div>
					</div>

					{/* Tools */}
					<div className="tech-category tech-category-3">
						<h3 className="text-2xl font-light mb-6 text-accent">Tools</h3>
						<div className="grid grid-cols-2 gap-4">
							{techStack.tools.map((tech) => (
								<div key={tech.name} className="tech-item flex items-center gap-3 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
									<span className="text-2xl">{tech.icon}</span>
									<span className="text-lg font-light">{tech.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
